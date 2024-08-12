import { CommentDocument } from './schema/comments.schema';
import { PostsService } from '../posts/posts.service';
import { Model } from 'mongoose';
import { UpdateCommentDto } from './Dto/comments.dto';
import { NotificationService } from '../notifications/notification.service';
export declare class CommentsService {
    private commentModel;
    private readonly postService;
    private readonly Notificationservice;
    constructor(commentModel: Model<CommentDocument>, postService: PostsService, Notificationservice: NotificationService);
    addComment(postId: string, userId: string, content: string): Promise<void>;
    replyComment(comentId: string, userId: string, content: string): Promise<void>;
    getCommentWithReplies(commentId: string): Promise<CommentDocument>;
    getPostCommentsWithReplies(postId: string): Promise<CommentDocument[]>;
    updateComment(commentId: string, updatedComment: UpdateCommentDto): Promise<any>;
    deleteComment(commentId: string): Promise<any>;
    getOnlyCommentsByPostId(postId: string): Promise<CommentDocument[]>;
}
