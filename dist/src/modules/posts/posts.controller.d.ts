/// <reference types="multer" />
import { PostsService } from "./posts.service";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/schema/user.schema";
import { UpdatePostDto } from "./dto/posts-update.dto";
import { CreatePostDto } from "./dto/create.post.dto";
import { LocationDto } from "./dto/location.dto";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(user: User, createDto: CreatePostDto, images: Express.Multer.File[]): Promise<import("./schema/post.schema").PostDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    update(id: string, updateDataDto: UpdatePostDto, images: Express.Multer.File[]): Promise<{
        data: PostEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deletePost(id: string): Promise<PostEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    viewOtherUserPost(id: string, user: User): Promise<PostEntity>;
    viewMyAds(user: User): Promise<PostEntity[]>;
    getWithinRadius(locationDto: LocationDto): Promise<any>;
}
