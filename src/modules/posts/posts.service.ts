import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, PostEntity } from "./schema/post.schema";
import { Model } from "mongoose";
import { ResponseCode } from "../../exceptions";
import { UpdatePostDto } from "./dto/posts-update.dto";

import { CreatePostDto } from "./dto/create.post.dto";
import { User, UserDocument } from "../user/user.schema";
// import { TestDocument } from "./schema/Update.schema";


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private schemaModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }
  async create(createDto: CreatePostDto): Promise<PostDocument> {
    const create: PostDocument = new this.schemaModel(createDto);
    return await create.save().catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
  }

  async findall(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await this.schemaModel.find().exec();
    const totalPages = Math.ceil(totalCount.length / limit);
    const data = await this.schemaModel
      .aggregate([
        {
          $skip: startIndex,
        },
        {
          $limit: endIndex,
        },
      ])
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });

    return {
      totalCount: totalCount.length,
      totalPages: totalPages,
      data: data,
    };
  }

  async update(id: string, updateDataDto: UpdatePostDto) {
    try {
      const updateData = await this.schemaModel.findByIdAndUpdate(id, { $set: updateDataDto }, { new: true }).exec();
      return { data: updateData };
    } catch (err) {
      console.error('Error updating data:', err.message);
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }
  async deletePost(id: string) {
    return await this.schemaModel
      .findByIdAndDelete(id)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }
  async viewMyAds(userId: string): Promise<any> {
    try {
      const p_selecedfields='title price createdAt'
      const u_selecedfields='name ratings'
      const p_data = await this.schemaModel.find({ userId }).select(p_selecedfields).exec();
      const u_data = await this.userModel.findById(userId).select(u_selecedfields).exec();
      if (!p_data || p_data.length === 0) {
        throw new HttpException('No posts found for this user', ResponseCode.NOT_FOUND);
      }
      const combinedData = p_data.map(post => ({
        ...post.toObject(),
        user: {
          name: u_data?.name,
          rating: u_data.ratings,
        },
      }));
      return combinedData;
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.NOT_FOUND);
    }
  }
}


