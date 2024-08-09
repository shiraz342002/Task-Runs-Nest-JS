import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { generateHash, getCharacterString } from "../../common/utils";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import {
  ErrorCodesMeta,
  ResponseCode,
  ResponseMessage,
} from "../../exceptions";
import type { Optional } from "../../types";
import { ResetPasswordDto } from "../auth/dto/reset-password.dto";
import { VerifyOtpDto } from "../auth/dto/verify-otp.dto";
import { MailService } from "../mail/mail.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, userJsonSchema } from "./schema/user.schema";
import { ForgotPasswordDto } from "../auth/dto/forgot-password.dto";
import { VerifyAccountDto } from "../auth/dto/verify-account.dto";
import { UserSignupDto } from "../auth/dto/user.signup.dto";
import { VerifyAccountOnlyDto } from "../auth/dto/verify-account-only.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private sendMail: MailService
  ) {}
  /**
   * get user schema
   * @returns
   */
  async sendForgetPassword(ForgetPasswordDto: ForgotPasswordDto) {
    const getFourDigitRandomNumber = this.generateString(4);
    const sendOTP = await this.userModel.findOneAndUpdate(
      { email: ForgetPasswordDto.email },
      {
        $set: {
          otp: (await getFourDigitRandomNumber).toString(),
          isOtpUsed: false,
        },
      }
    );
    if (!sendOTP) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    const user = {
      email: ForgetPasswordDto.email,
      otp: (await getFourDigitRandomNumber).toString(),
    };
    await this.sendMail.sendForgetPasswordEmail(user);
    return {
      message: ResponseMessage.SUCCESS,
      successCode: ResponseCode.SUCCESS,
    };
  }

  /**
   * get user schema
   * @returns
   */
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const otp = await this.userModel.findOneAndUpdate(
      { otp: verifyOtpDto.otp, isOtpUsed: false },
      {
        $set: {
          isOtpUsed: true,
        },
      }
    );
    if (!otp) {
      throw new HttpException(
        ErrorCodesMeta.INVALID_OTP,
        ResponseCode.UNAUTHORIZED
      );
    }

    return {
      email: otp.email,
    };
  }

  async logout(userId: string): Promise<any> {
    return await this.userModel
      .findByIdAndUpdate(userId, { tokens: [] })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }

  /**
   * get user schema
   * @returns
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    resetPasswordDto.password = generateHash(resetPasswordDto.password);
    const data = await this.userModel.findOneAndUpdate(
      {
        email: resetPasswordDto.email,
        isOtpUsed: true,
        otp: resetPasswordDto.otp,
      },
      {
        $set: {
          password: resetPasswordDto.password,
          isOtpUsed: false,
        },
      }
    );
    if (!data) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    data.password = "";
    data.otp = "";
    return {
      data,
    };
  }
  /**
   * get user schema
   * @returns
   */
  async getSchema() {
    return await userJsonSchema.Category;
  }

  /**
   * verify the account
   * @param email
   * @returns
   */
  async verifyAccount(dto: VerifyAccountDto): Promise<any> {
    const accExist = await this.findOne({
      email: dto.email,
      otp: dto.otp,
    });
    console.log(accExist);
    
    if (!accExist) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    const data = await this.userModel.updateOne(
      { email: dto.email, otp: dto.otp },
      {
        $set: {
          verify: "true",
          isOtpUsed: false,
        },
      }
    );

    if (data) {
      return accExist;
    }
  }
  /**
   * Get User
   * @param pageOptionsDto
   * @returns
   */

  async getOne(id: string): Promise<User> {
    const data = await this.userModel.findById({ _id: id }).catch((err) => {
      throw new HttpException(err.message, ResponseCode.NOT_FOUND);
    });

    (data.password = ""), (data.otp = "");
    return data;
  }

  /**
   * Find single user
   *
   *
   */
  async findOne(findData: any): Promise<User | null> {
    const user = await this.userModel.findOne(findData).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return user;
  }
  /**
   * Find single user by email
   *
   *
   */
  async findByEmail(
    options: Partial<{ email: string }>
  ): Promise<Optional<User>> {
    const user = await this.userModel
      .findOne({ email: options.email })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return user;
  }

  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  /**
   * create single user
   *
   *S
   */
  async createUser(userRegisterDto: UserSignupDto): Promise<UserSignupDto> {
    const createdUser = await new this.userModel(userRegisterDto).save().catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST); });     
    if (createdUser) {
      const getFourDigitRandomNumber = this.generateString(4);
      await this.userModel.findOneAndUpdate(
        { email: userRegisterDto.email },
        {
          $set: {
            otp: (await getFourDigitRandomNumber).toString(),
            isOtpUsed: false,
          }
        }
      );
      
      return createdUser;
    }}
  /**
   * resend OTP
   *
   *
   */

  async resendOTP(dto: VerifyAccountOnlyDto): Promise<any> {
    const accExist = await this.findOne({
      email: dto.email,
    });
    if (!accExist) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }

    const getFourDigitRandomNumber = this.generateString(4);
    const data = await this.userModel
      .findOneAndUpdate(
        { email: dto.email },
        {
          $set: {
            otp: (await getFourDigitRandomNumber).toString(),
            isOtpUsed: false,
          },
        }
      )
      .exec();

    if (data) {
      return { message: "OTP resend successfully" };
    }
  }

  /**
   * Find all users
   *
   *
   */
  async getUsers(pageOptionsDto: PageOptionsDto): Promise<User[]> {
    //let regex = new RegExp(value.searchQuery,'i');
    //{ $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] }
    const queryBuilder = await this.userModel
      .aggregate([
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              { $sort: { [pageOptionsDto.column]: pageOptionsDto.order } },
              { $skip: pageOptionsDto.skip },
              { $limit: pageOptionsDto.take },
            ],
          },
        },
        {
          $project: {
            data: 1,
            // Get total from the first element of the metadata array
            total: { $arrayElemAt: ["$metadata.total", 0] },
          },
        },
      ])
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return queryBuilder;
  }

  /**
   * update single user
   *
   *
   */
  async update(userId: string, userUpdateDto: UpdateUserDto) {
    if (userUpdateDto.password) {
      userUpdateDto.password = generateHash(userUpdateDto.password);
    }
    const returnObj = await this.userModel
      .findByIdAndUpdate(userId, userUpdateDto, { new: true })
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return { data: returnObj };
  }

  async getProfileData(userId: string) {
    const data = await this.userModel
      .findById(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    data.password = "";
    return data;
  }

  async delete(userId: string) {
    return await this.userModel
      .findByIdAndDelete(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }
  async viewProfile(userId:string){
    const fieldsToSelect = 'name avatar address email phone about';
    const data = await this.userModel.findById(userId).select(fieldsToSelect).exec().catch((err)=>{
      throw new HttpException(err.message,ResponseCode.NOT_FOUND);
    })
    return data
  }

  async viewOtherProfile(userId: string) {
    const fieldsToSelect = 'avatar name profession ratings createdAt task_completed city zip_code about reviews';
    
    try {
      const data = await this.userModel
        .findById(userId)
        .select(fieldsToSelect)
        .populate({
          path: 'reviews',
          select: 'rating text reviewerId',
          populate: {
            path: 'reviewerId',
            select: 'avatar name',
          },
        })
        .exec();
      if (!data) {
        throw new HttpException('User not found', ResponseCode.NOT_FOUND);
      }
      
      return data;
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.NOT_FOUND);
    }
  }
  async findCustomData(userId:string,custom_fields){
    const data = await this.userModel.findById(userId).select(custom_fields).exec().catch((err)=>{
      throw new HttpException(err.message,ResponseCode.NOT_FOUND);
    })
    return data
  }
  async updateReviews(userId:string,reviewId:string){
    await this.userModel.findByIdAndUpdate(userId,{$push:{reviews:reviewId}},{new:true})
  }
  
  async CalcRatings(revieweeId: string, newRating: number): Promise<void> {
    if (!Number.isInteger(newRating) || newRating < 1 || newRating > 5) {
      throw new Error('Rating must be an integer between 1 and 5');
    }
    const user = await this.userModel.findById(revieweeId).select('ratings reviews').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const c_rating = user.ratings;
    const numOfReviews = user.reviews.length;
    const updatedRating = ((c_rating * (numOfReviews - 1)) + newRating) / numOfReviews;
    const roundedRating = Math.round(updatedRating * 2) / 2;
    await this.userModel.findByIdAndUpdate(revieweeId, { ratings: roundedRating }, { new: true }).exec();
  }
  async removeReviewFromUser(userId: string, reviewId: string): Promise<void> {
    const reviewObjectId = new Types.ObjectId(reviewId);
    try {
      const result = await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { reviews: reviewObjectId } },
        { new: true }
      ).exec();
      if (!result) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getProfileReviews(userId: string): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid ID format');
      }

      const user = await this.userModel
        .findById(new Types.ObjectId(userId))
        .populate({
          path: 'reviews',
          select: 'reviewerId revieweeId rating text',
          populate: {
            path: 'reviewerId',
            select: 'avatar name',
          },
        })
        .exec();
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return user.reviews;
    } catch (error) {
      console.error('Error in UserService.getProfileReviews:', error);
      throw new InternalServerErrorException('An error occurred while fetching reviews');
    }
  }

  async viewMyCompleteProfile(userId:string):Promise<User>{
    const user = await this.userModel.findById(userId).populate({
      path:'reviews',
      select:'reviwerId revieweeId rating text',
      populate:{
        path:'reviewerId',
        select:'avatar name',
      },
    })
    .exec()
    if(!user){
      throw new NotFoundException("User Profile Not Found or deleted")
    }
    return user
  }
  async incrementMyOrder(userId: string){
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      { $inc: { my_orders: 1 } },
      { new: true }
    );
  }
  
  async incrementTaskCompleted(userId: string){
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      { $inc: { task_completed: 1 } },
      { new: true }
    );
  }
}


