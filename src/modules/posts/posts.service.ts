import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, PostEntity } from "./schema/post.schema";
import { Model } from "mongoose";
import { ResponseCode } from "../../exceptions";
import { UpdatePostDto } from "./dto/posts-update.dto";

import { CreatePostDto } from "./dto/create.post.dto";
import { UserService } from "../user/user.service";
import { CommentDto } from "./dto/comment.dto";
// import { TestDocument } from "./schema/Update.schema";


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private postService: Model<PostDocument>,
    private readonly userService: UserService
  ) { }
  async create(createDto: CreatePostDto): Promise<PostDocument> {
    const create: PostDocument = new this.postService(createDto);
    return await create.save().catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
  }

  async findall(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await this.postService.find().exec();
    const totalPages = Math.ceil(totalCount.length / limit);
    const data = await this.postService
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
      const updateData = await this.postService.findByIdAndUpdate(id, { $set: updateDataDto }, { new: true }).exec();
      return { data: updateData };
    } catch (err) {
      console.error('Error updating data:', err.message);
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }
  async deletePost(id: string) {
    return await this.postService
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

      const p_data = await this.postService.find({ userId }).select(p_selecedfields).exec();
      const u_data = await this.userService.findCustomData(userId,u_selecedfields)
      if (!p_data || p_data.length === 0 || !u_data) {
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

  async viewOtherUserPost(id:string):Promise<any>{   
    console.log(id);
     
    const p_fieldsToSelect = 'title images createdAt description price userId';
    const u_selecedfields='name ratings'
    const p_data = await this.postService.findById(id).select(p_fieldsToSelect).exec();
    console.log(p_data.userId);
    const u_data = await this.userService.findCustomData(p_data.userId,u_selecedfields);
    if (!p_data) {
      throw new HttpException('no Post not found', ResponseCode.NOT_FOUND);
    }
    if (!u_data) {
      throw new HttpException('User not found', ResponseCode.NOT_FOUND);
    }
    const combinedData = {
      ...p_data.toObject(),
      user: {
        name: u_data.name,
        ratings: u_data.ratings,
      },
    };
   //Yahan se Userid ko final returned data se urana ha 
   delete (combinedData as any).userId;
    return combinedData
  }

  async addComment(PostId:string,userId:string,commentDto:CommentDto):Promise<void>{
    console.log("Comment "+commentDto);
    
    const post = await this.postService.findById(PostId);
    if(!post){
      throw new HttpException('no Post not found', ResponseCode.NOT_FOUND);
    }
    post.comments.push({
      userId:userId,
      content:commentDto.content,
      replies:[],
    })
    await post.save()
  }


}


