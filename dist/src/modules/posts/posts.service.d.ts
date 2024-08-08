/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { PostDocument, PostEntity } from "./schema/post.schema";
import { Model } from "mongoose";
import { UpdatePostDto } from "./dto/posts-update.dto";
import { CreatePostDto } from "./dto/create.post.dto";
import { UserService } from "../user/user.service";
export declare class PostsService {
    private postService;
    private readonly userService;
    constructor(postService: Model<PostDocument>, userService: UserService);
    create(createDto: CreatePostDto): Promise<PostDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    update(id: string, updateDataDto: UpdatePostDto): Promise<{
        data: PostEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deletePost(id: string): Promise<PostEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    viewMyAds(userId: string): Promise<any>;
    findById(postId: string): Promise<PostDocument>;
    findPostComments(postId: string): Promise<PostDocument>;
    getPostWithPopulatedComments(postId: string): Promise<PostDocument | null>;
}
