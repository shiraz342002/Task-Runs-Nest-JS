import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, PostEntity } from "./schema/post.schema";
import { Model } from "mongoose";
import { ResponseCode } from "../../exceptions";
import { UpdatePostDto } from "./dto/posts-update.dto";

import { CreatePostDto } from "./dto/create.post.dto";
// import { TestDocument } from "./schema/Update.schema";


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private schemaModel: Model<PostDocument>
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
      console.log('Updated Data:', updateData);
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
}
