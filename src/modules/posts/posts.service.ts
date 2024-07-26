import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, PostEntity } from "./schema/post.schema";
import { Model } from "mongoose";
import { ResponseCode } from "../../exceptions";
import { UpdatePostDto } from "./dto/posts-update.dto";


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private schemaModel: Model<PostDocument>
  ) {}
  async create(createDto: PostEntity) {
    const create: PostDocument = new this.schemaModel(createDto);
    console.log("Yahan sab set ha");
    
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
    console.log(updateDataDto);
    const updateData = await this.schemaModel
      .findByIdAndUpdate(id, updateDataDto, { new: true })
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
      
    return { data: updateData };
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
