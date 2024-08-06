"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const userRoles_1 = require("../../casl/userRoles");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const decorators_1 = require("../../decorators");
const index_1 = require("../../exceptions/index");
const logger_service_1 = require("../../logger/logger.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_schema_1 = require("./schema/user.schema");
const user_service_1 = require("./user.service");
const multer_config_1 = require("../../configuration/multer.config");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService, loggerService) {
        this.userService = userService;
        this.loggerService = loggerService;
        this.loggerService.setContext("users controller");
    }
    getUsers(pageOptionsDto, user) {
        this.loggerService.log(`GET User/ ${index_1.LoggerMessages.API_CALLED} ${user.email}`);
        return this.userService.getUsers(pageOptionsDto);
    }
    getuserSchema() {
        this.loggerService.log(`GET User Schema/ ${index_1.LoggerMessages.API_CALLED}`);
        return this.userService.getSchema();
    }
    async update(user, userUpdateDto, file) {
        if (file) {
            userUpdateDto.avatar = `/${file.filename}`;
        }
        return this.userService.update(user.id, userUpdateDto);
    }
    async deleteAccount(user) {
        return this.userService.delete(user.id);
    }
    async viewProfile(user) {
        return this.userService.viewProfile(user.id);
    }
    async viewOtherProfile(id, user) {
        return this.userService.viewOtherProfile(id);
    }
    async getProfileReviews() {
        return this.userService.getProfileReviews();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get users list",
        type: user_schema_1.User,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.userRoute.schema),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get User Schema",
        type: user_schema_1.User,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getuserSchema", null);
__decorate([
    (0, common_1.Patch)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update User Profile",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', multer_config_1.multerOptionsAvatar)),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.userRoute.deleteAccount),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Delete User ",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Delete, "User"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.userRoute.myprofile),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View My Profile",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "viewProfile", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.userRoute.otherUserProfile),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View Other User Profile",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "viewOtherProfile", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.userRoute.getMyReviews),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View Other User Profile",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Reviews"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfileReviews", null);
UserController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.userRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.userRoute.name),
    __metadata("design:paramtypes", [user_service_1.UserService,
        logger_service_1.LoggerService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map