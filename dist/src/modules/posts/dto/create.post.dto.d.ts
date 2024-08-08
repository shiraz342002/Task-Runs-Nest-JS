import { PostEntity } from '../schema/post.schema';
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<PostEntity, "title" | "description" | "price" | "obo" | "isUrgent" | "isHelpFree" | "location" | "streetAddress" | "city" | "zipCode" | "state" | "images" | "userId">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
