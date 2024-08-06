import { User } from "../../user/schema/user.schema";
declare const ResetPasswordDto_base: import("@nestjs/common").Type<Pick<User, "email" | "password" | "otp">>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
}
export {};
