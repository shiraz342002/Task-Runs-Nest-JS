import { CommentsService } from "./comments.service";
import { User } from "../user/schema/user.schema";
import { CommentDto, UpdateCommentDto } from "./Dto/comments.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    addComment(postId: string, commentDto: CommentDto, user: User): Promise<any>;
    addReply(comentId: string, commentDto: CommentDto, user: any): Promise<any>;
    getCommentWithReplies(commentId: string): Promise<import("./schema/comments.schema").CommentDocument>;
    getPostCommentsWithReplies(postId: string): Promise<import("./schema/comments.schema").CommentDocument[]>;
    updateComment(commentId: string, commentdto: UpdateCommentDto): Promise<any>;
    deleteComment(commentId: string): Promise<any>;
    getPostComments(postId: string): Promise<import("./schema/comments.schema").CommentDocument[]>;
}
