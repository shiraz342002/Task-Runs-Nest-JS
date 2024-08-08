import { PostEntity } from '../schema/post.schema';
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<PostEntity, "title" | "description" | "images" | "city" | "streetAddress" | "state" | "zipCode" | "userId" | "isUrgent" | "isHelpFree" | "obo" | "price" | "location">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
