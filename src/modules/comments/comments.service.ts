import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comments.schema';
import { PostsService } from '../posts/posts.service';
import { Model, Types } from 'mongoose';
import { UpdateCommentDto } from './Dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly postService: PostsService
  ) { }

  async addComment(postId: string, userId: string, content: string): Promise<void> {
    const post = await this.postService.findById(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const comment = new this.commentModel({
      userId: new Types.ObjectId(userId),
      content,
    });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
  }
  async replyComment(comentId: string, userId: string, content: string): Promise<void> {
    const orignal_coment = await this.commentModel.findById(comentId);
    if (!orignal_coment) {
      throw new HttpException('Comment not found or Deleted', HttpStatus.NOT_FOUND);
    }
    const reply = new this.commentModel({
      userId: new Types.ObjectId(userId),
      content,
    });
    await reply.save();
    orignal_coment.replies.push(reply._id);
    await orignal_coment.save();
  }
  async getCommentWithReplies(commentId: string): Promise<CommentDocument> {
    return this.commentModel
      .findById(commentId)
      .populate({
        path: 'replies',
        populate: {
          path: 'replies',  
          populate: {
            path: 'replies',
          populate:{
            path:'replies'
          }  
          },
        },
      })
      .exec();
  }
  async getPostCommentsWithReplies(postId: string): Promise<CommentDocument[]> {
    const populatedPost = await this.postService.getPostWithPopulatedComments(postId);
    if (!populatedPost || !populatedPost.comments) {
      throw new HttpException('Post not found or no comments available', HttpStatus.NOT_FOUND);
    }
    return populatedPost.comments as unknown as CommentDocument[];
  }

  async updateComment(commentId:string,updatedComment:UpdateCommentDto):Promise<any>{
      return await this.commentModel.findByIdAndUpdate(commentId,updatedComment)
  }
}
