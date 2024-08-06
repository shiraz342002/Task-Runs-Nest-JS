import { User } from "../../user/schema/user.schema";
declare const ForgotPasswordDto_base: import("@nestjs/common").Type<Pick<User, "email">>;
export declare class ForgotPasswordDto extends ForgotPasswordDto_base {
    email: string;
}
export {};
