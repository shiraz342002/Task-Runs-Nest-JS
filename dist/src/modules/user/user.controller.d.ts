/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
    ViewMyCompleteProfile(user: User): Promise<User>;
}
