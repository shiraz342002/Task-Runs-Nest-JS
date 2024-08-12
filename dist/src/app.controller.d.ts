import { PostsService } from './modules/posts/posts.service';
import { PostEntity } from './modules/posts/schema/post.schema';
export declare class AppController {
    private readonly postService;
    constructor(postService: PostsService);
    getShuffledPosts(): Promise<PostEntity[]>;
}
