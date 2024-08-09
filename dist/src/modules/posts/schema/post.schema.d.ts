import mongoose, { Document } from "mongoose";
export type PostDocument = PostEntity & Document;
export declare class PostEntity {
    title: string;
    description: string;
    images: string[];
    city?: string;
    streetAddress?: string;
    state?: string;
    zipCode?: string;
    userId: string;
    isUrgent: boolean;
    isCompleted: boolean;
    isHelpFree?: boolean;
    obo?: boolean;
    price?: number;
    location: {
        type: string;
        coordinates: [number, number];
    };
    comments: mongoose.Schema.Types.ObjectId[];
}
declare const PostSchema: mongoose.Schema<PostEntity, mongoose.Model<PostEntity, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PostEntity>;
export { PostSchema };
