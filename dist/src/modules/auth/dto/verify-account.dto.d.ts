import { User } from "../../user/schema/user.schema";
declare const VerifyAccountDto_base: import("@nestjs/common").Type<Pick<User, "email" | "otp">>;
export declare class VerifyAccountDto extends VerifyAccountDto_base {
}
export {};
