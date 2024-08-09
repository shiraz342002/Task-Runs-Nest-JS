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
    changeisCompleteFlag(postId: string): Promise<void>;
}
