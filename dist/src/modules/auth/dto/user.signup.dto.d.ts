import { User } from "../../user/schema/user.schema";
declare const UserSignupDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email" | "password" | "city">>;
export declare class UserSignupDto extends UserSignupDto_base {
}
export {};
