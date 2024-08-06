import { User } from "../../user/schema/user.schema";
declare const UserUpdateDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email" | "password" | "about" | "avatar" | "phone" | "address" | "profession" | "zip_code" | "city">>;
export declare class UserUpdateDto extends UserUpdateDto_base {
}
export {};
