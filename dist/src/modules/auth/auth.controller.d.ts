import { User } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user.login.dto";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { VerifyAccountDto } from "./dto/verify-account.dto";
import { UserSignupDto } from "./dto/user.signup.dto";
import { VerifyAccountOnlyDto } from "./dto/verify-account-only.dto";
export declare class AuthController {
    private userService;
    private authService;
    loggerService: any;
    constructor(userService: UserService, authService: AuthService);
    generateString(length: any): Promise<string>;
    verifyToken(dto: VerifyAccountDto): Promise<any>;
    userLogin(userLoginDto: UserLoginDto): Promise<TokenPayloadDto>;
    userRegister(userRegisterDto: UserSignupDto): Promise<UserSignupDto>;
    sendForgetPassword(ForgetPasswordDto: ForgotPasswordDto): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        data: User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        email: string;
    }>;
    OtpResend(dto: VerifyAccountOnlyDto): Promise<any>;
    getCurrentUser(user: User): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    logOut(user: User): Promise<any>;
}
