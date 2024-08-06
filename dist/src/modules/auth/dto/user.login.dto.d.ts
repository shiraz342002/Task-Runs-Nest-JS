import { User } from "../../user/schema/user.schema";
declare const UserLoginDto_base: import("@nestjs/common").Type<Pick<User, "email" | "password">>;
export declare class UserLoginDto extends UserLoginDto_base {
}
export {};
