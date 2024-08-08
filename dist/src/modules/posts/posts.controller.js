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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("./schema/post.schema");
const user_schema_1 = require("../user/schema/user.schema");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const posts_update_dto_1 = require("./dto/posts-update.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../configuration/multer.config");
const create_post_dto_1 = require("./dto/create.post.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async create(user, createDto, images) {
        if (images) {
            createDto.images = images.map(file => file.path);
        }
        else {
            createDto.images = [];
        }
        if (createDto.location && typeof createDto.location === 'string') {
            try {
                createDto.location = JSON.parse(createDto.location);
            }
            catch (error) {
                console.error("Invalid location format:", createDto.location);
            }
        }
        createDto.userId = user.id;
        const post = await this.postsService.create(createDto);
        return post;
    }
    findall(page = 1, limit = 20) {
        return this.postsService.findall(page, limit);
    }
    async update(id, updateDataDto, images) {
        if (images) {
            updateDataDto.images = images.map(file => file.path);
        }
        else {
            updateDataDto.images = [];
        }
        if (updateDataDto.location && typeof updateDataDto.location === 'string') {
            try {
                updateDataDto.location = JSON.parse(updateDataDto.location);
            }
            catch (error) {
                console.error("Invalid location format:", updateDataDto.location);
            }
        }
        const result = await this.postsService.update(id, updateDataDto);
        return result;
    }
    async deletePost(id) {
        return this.postsService.deletePost(id);
    }
    async viewOtherUserPost(id, user) {
        return this.postsService.viewOtherUserPost(id);
    }
    async viewMyAds(user) {
        return this.postsService.viewMyAds(user.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully.' }),
    (0, swagger_1.ApiBody)({
        description: 'Post creation data',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                obo: { type: 'boolean' },
                location: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', example: 'Point' },
                        coordinates: {
                            type: 'array',
                            items: { type: 'number' },
                            example: [40.7128, -74.0060],
                        },
                    },
                    example: {
                        "type": "Point",
                        "coordinates": [
                            -122.4194,
                            37.7749
                        ]
                    },
                },
                isUrgent: { type: 'boolean' },
                isHelpFree: { type: 'boolean' },
                streetAddress: { type: 'string' },
                city: { type: 'string' },
                zipCode: { type: 'string' },
                state: { type: 'string' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, multer_config_1.multerOptionsPostImages)),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        create_post_dto_1.CreatePostDto, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: post_schema_1.PostEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findall", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.postRoute.update),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Post"),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post Updated successfully.' }),
    (0, swagger_1.ApiBody)({
        description: 'Post Updation data',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                location: {
                    type: 'object',
                    properties: {
                        type: { type: 'string', example: 'Point' },
                        coordinates: {
                            type: 'array',
                            items: { type: 'number' },
                            example: [40.7128, -74.0060],
                        },
                    },
                    example: {
                        "type": "Point",
                        "coordinates": [
                            -122.4194,
                            37.7749
                        ]
                    },
                },
                isUrgent: { type: 'boolean' },
                isHelpFree: { type: 'boolean' },
                obo: { type: 'boolean' },
                streetAddress: { type: 'string' },
                city: { type: 'string' },
                zipCode: { type: 'string' },
                state: { type: 'string' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, multer_config_1.multerOptionsPostImages)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_update_dto_1.UpdatePostDto, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.postRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Post",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Delete, "Post"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.postRoute.viewOtherPosts),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View Other User Specefic Post",
        type: user_schema_1.User,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "viewOtherUserPost", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.postRoute.viewMyAds),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View Users Ads/Posts",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "viewMyAds", null);
PostsController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.postRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.postRoute.name),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map