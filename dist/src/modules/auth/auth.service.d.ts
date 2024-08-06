import { JwtService } from "@nestjs/jwt";
import type { User } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { UserLoginDto } from "./dto/user.login.dto";
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    createAccessToken(user: User): Promise<TokenPayloadDto>;
    validateUser(userLoginDto: UserLoginDto): Promise<User>;
}
