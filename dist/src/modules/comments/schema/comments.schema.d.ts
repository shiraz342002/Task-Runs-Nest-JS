import mongoose, { Document } from 'mongoose';
export type CommentDocument = Comment & Document;
export declare class Comment {
    userId: mongoose.Schema.Types.ObjectId;
    content: string;
    replies: mongoose.Schema.Types.ObjectId[];
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
