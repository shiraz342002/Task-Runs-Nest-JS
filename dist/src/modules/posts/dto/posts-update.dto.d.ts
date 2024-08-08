import { PostEntity } from "../schema/post.schema";
declare const UpdatePostDto_base: import("@nestjs/common").Type<Partial<Pick<PostEntity, "title" | "description" | "images" | "city" | "streetAddress" | "state" | "zipCode" | "isUrgent" | "isHelpFree" | "obo" | "price" | "location">>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
}
export {};
