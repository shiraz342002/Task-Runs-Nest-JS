import { PostEntity } from '../schema/post.schema';
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<PostEntity, "title" | "city" | "userId" | "images" | "streetAddress" | "state" | "zipCode">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
