import { CommentDocument } from './schema/comments.schema';
import { PostsService } from '../posts/posts.service';
import { Model } from 'mongoose';
import { UpdateCommentDto } from './Dto/comments.dto';
export declare class CommentsService {
    private commentModel;
    private readonly postService;
    constructor(commentModel: Model<CommentDocument>, postService: PostsService);
    addComment(postId: string, userId: string, content: string): Promise<void>;
    replyComment(comentId: string, userId: string, content: string): Promise<void>;
    getCommentWithReplies(commentId: string): Promise<CommentDocument>;
    getPostCommentsWithReplies(postId: string): Promise<CommentDocument[]>;
    updateComment(commentId: string, updatedComment: UpdateCommentDto): Promise<any>;
    deleteComment(commentId: string): Promise<any>;
    getOnlyCommentsByPostId(postId: string): Promise<CommentDocument[]>;
}
