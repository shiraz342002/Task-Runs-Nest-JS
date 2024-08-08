"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../common/utils");
const exceptions_1 = require("../../exceptions");
const mail_service_1 = require("../mail/mail.service");
const user_schema_1 = require("./schema/user.schema");
let UserService = class UserService {
    constructor(userModel, sendMail) {
        this.userModel = userModel;
        this.sendMail = sendMail;
    }
    async sendForgetPassword(ForgetPasswordDto) {
        const getFourDigitRandomNumber = this.generateString(4);
        const sendOTP = await this.userModel.findOneAndUpdate({ email: ForgetPasswordDto.email }, {
            $set: {
                otp: (await getFourDigitRandomNumber).toString(),
                isOtpUsed: false,
            },
        });
        if (!sendOTP) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        const user = {
            email: ForgetPasswordDto.email,
            otp: (await getFourDigitRandomNumber).toString(),
        };
        await this.sendMail.sendForgetPasswordEmail(user);
        return {
            message: exceptions_1.ResponseMessage.SUCCESS,
            successCode: exceptions_1.ResponseCode.SUCCESS,
        };
    }
    async verifyOtp(verifyOtpDto) {
        const otp = await this.userModel.findOneAndUpdate({ otp: verifyOtpDto.otp, isOtpUsed: false }, {
            $set: {
                isOtpUsed: true,
            },
        });
        if (!otp) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.INVALID_OTP, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        return {
            email: otp.email,
        };
    }
    async logout(userId) {
        return await this.userModel
            .findByIdAndUpdate(userId, { tokens: [] })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async resetPassword(resetPasswordDto) {
        resetPasswordDto.password = (0, utils_1.generateHash)(resetPasswordDto.password);
        const data = await this.userModel.findOneAndUpdate({
            email: resetPasswordDto.email,
            isOtpUsed: true,
            otp: resetPasswordDto.otp,
        }, {
            $set: {
                password: resetPasswordDto.password,
                isOtpUsed: false,
            },
        });
        if (!data) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        data.password = "";
        data.otp = "";
        return {
            data,
        };
    }
    async getSchema() {
        return await user_schema_1.userJsonSchema.Category;
    }
    async verifyAccount(dto) {
        const accExist = await this.findOne({
            email: dto.email,
            otp: dto.otp,
        });
        console.log(accExist);
        if (!accExist) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        const data = await this.userModel.updateOne({ email: dto.email, otp: dto.otp }, {
            $set: {
                verify: "true",
                isOtpUsed: false,
            },
        });
        if (data) {
            return accExist;
        }
    }
    async getOne(id) {
        const data = await this.userModel.findById({ _id: id }).catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.NOT_FOUND);
        });
        (data.password = ""), (data.otp = "");
        return data;
    }
    async findOne(findData) {
        const user = await this.userModel.findOne(findData).catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return user;
    }
    async findByEmail(options) {
        const user = await this.userModel
            .findOne({ email: options.email })
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return user;
    }
    async generateString(length) {
        let result = "";
        const characters = (0, utils_1.getCharacterString)();
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async createUser(userRegisterDto) {
        const createdUser = await new this.userModel(userRegisterDto).save().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        if (createdUser) {
            const getFourDigitRandomNumber = this.generateString(4);
            await this.userModel.findOneAndUpdate({ email: userRegisterDto.email }, {
                $set: {
                    otp: (await getFourDigitRandomNumber).toString(),
                    isOtpUsed: false,
                }
            });
            return createdUser;
        }
    }
    async resendOTP(dto) {
        const accExist = await this.findOne({
            email: dto.email,
        });
        if (!accExist) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        const getFourDigitRandomNumber = this.generateString(4);
        const data = await this.userModel
            .findOneAndUpdate({ email: dto.email }, {
            $set: {
                otp: (await getFourDigitRandomNumber).toString(),
                isOtpUsed: false,
            },
        })
            .exec();
        if (data) {
            return { message: "OTP resend successfully" };
        }
    }
    async getUsers(pageOptionsDto) {
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
                    total: { $arrayElemAt: ["$metadata.total", 0] },
                },
            },
        ])
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return queryBuilder;
    }
    async update(userId, userUpdateDto) {
        if (userUpdateDto.password) {
            userUpdateDto.password = (0, utils_1.generateHash)(userUpdateDto.password);
        }
        const returnObj = await this.userModel
            .findByIdAndUpdate(userId, userUpdateDto, { new: true })
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return { data: returnObj };
    }
    async getProfileData(userId) {
        const data = await this.userModel
            .findById(userId)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        data.password = "";
        return data;
    }
    async delete(userId) {
        return await this.userModel
            .findByIdAndDelete(userId)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async viewProfile(userId) {
        const fieldsToSelect = 'name avatar address email phone about';
        const data = await this.userModel.findById(userId).select(fieldsToSelect).exec().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.NOT_FOUND);
        });
        return data;
    }
    async viewOtherProfile(userId) {
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
                throw new common_1.HttpException('User not found', exceptions_1.ResponseCode.NOT_FOUND);
            }
            return data;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.NOT_FOUND);
        }
    }
    async findCustomData(userId, custom_fields) {
        const data = await this.userModel.findById(userId).select(custom_fields).exec().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.NOT_FOUND);
        });
        return data;
    }
    async updateReviews(userId, reviewId) {
        await this.userModel.findByIdAndUpdate(userId, { $push: { reviews: reviewId } }, { new: true });
    }
    async CalcRatings(revieweeId, newRating) {
        if (!Number.isInteger(newRating) || newRating < 1 || newRating > 5) {
            throw new Error('Rating must be an integer between 1 and 5');
        }
        const user = await this.userModel.findById(revieweeId).select('ratings reviews').exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const c_rating = user.ratings;
        const numOfReviews = user.reviews.length;
        const updatedRating = ((c_rating * (numOfReviews - 1)) + newRating) / numOfReviews;
        const roundedRating = Math.round(updatedRating * 2) / 2;
        await this.userModel.findByIdAndUpdate(revieweeId, { ratings: roundedRating }, { new: true }).exec();
    }
    async removeReviewFromUser(userId, reviewId) {
        const reviewObjectId = new mongoose_2.Types.ObjectId(reviewId);
        try {
            const result = await this.userModel.findByIdAndUpdate(userId, { $pull: { reviews: reviewObjectId } }, { new: true }).exec();
            if (!result) {
                throw new common_1.NotFoundException('User not found');
            }
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw new common_1.InternalServerErrorException('Failed to update user');
        }
    }
    async getProfileReviews(userId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                throw new common_1.BadRequestException('Invalid ID format');
            }
            const user = await this.userModel
                .findById(new mongoose_2.Types.ObjectId(userId))
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
                throw new common_1.NotFoundException('User not found');
            }
            return user.reviews;
        }
        catch (error) {
            console.error('Error in UserService.getProfileReviews:', error);
            throw new common_1.InternalServerErrorException('An error occurred while fetching reviews');
        }
    }
    async viewMyCompleteProfile(userId) {
        const user = await this.userModel.findById(userId).populate({
            path: 'reviews',
            select: 'reviwerId revieweeId rating text',
            populate: {
                path: 'reviewerId',
                select: 'avatar name',
            },
        })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException("User Profile Not Found or deleted");
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map