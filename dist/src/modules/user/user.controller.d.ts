/// <reference types="multer" />
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { LoggerService } from "../../logger/logger.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    private readonly loggerService;
    constructor(userService: UserService, loggerService: LoggerService);
    getUsers(pageOptionsDto: PageOptionsDto, user: User): Promise<User[]>;
    getuserSchema(): Promise<import("openapi3-ts").SchemaObject>;
    update(user: User, userUpdateDto: UpdateUserDto, file: Express.Multer.File): Promise<{
        data: User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteAccount(user: User): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    viewProfile(user: User): Promise<User>;
    viewOtherProfile(id: string, user: User): Promise<User>;
}
