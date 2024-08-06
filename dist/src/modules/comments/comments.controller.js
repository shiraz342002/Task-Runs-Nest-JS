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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const constants_routes_1 = require("../../constants/constants-routes");
const comments_service_1 = require("./comments.service");
const swagger_1 = require("@nestjs/swagger");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/schema/user.schema");
const comments_dto_1 = require("./Dto/comments.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async addComment(postId, commentDto, user) {
        const { content } = commentDto;
        if (!content || typeof content !== 'string') {
            throw new common_1.HttpException('Invalid comment content', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            await this.commentService.addComment(postId, user.id, content);
            return { message: 'Comment added successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Unable to add comment', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addReply(comentId, commentDto, user) {
        const { content } = commentDto;
        if (!content || typeof content !== 'string') {
            throw new common_1.HttpException('Invalid Reply content', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            await this.commentService.replyComment(comentId, user.id, content);
            return { message: 'Reply added successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Unable to add Reply', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCommentWithReplies(commentId) {
        return this.commentService.getCommentWithReplies(commentId);
    }
    async getPostCommentsWithReplies(postId) {
        return this.commentService.getPostCommentsWithReplies(postId);
    }
    async updateComment(commentId, commentdto) {
        return this.commentService.updateComment(commentId, commentdto);
    }
    async deleteComment(commentId) {
        return this.commentService.deleteComment(commentId);
    }
    async getPostComments(postId) {
        return this.commentService.getOnlyCommentsByPostId(postId);
    }
};
__decorate([
    (0, common_1.Post)(constants_routes_1.constTexts.commentRoute.Add),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, 'User'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comments_dto_1.CommentDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)(constants_routes_1.constTexts.commentRoute.Reply),
    (0, swagger_1.ApiOperation)({ summary: 'Add a Reply to a Coment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reply added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, 'User'),
    __param(0, (0, common_1.Param)('comentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comments_dto_1.CommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addReply", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View Comment With Replies' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment Retrived successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, 'User'),
    (0, common_1.Get)(constants_routes_1.constTexts.commentRoute.getCommentWithReplies),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentWithReplies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View Post Comments and Replies' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post Comments Retrived successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, 'User'),
    (0, common_1.Get)(constants_routes_1.constTexts.commentRoute.getPostCommentsWithReplies),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getPostCommentsWithReplies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Edit Your Comments' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comments Edited successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, 'User'),
    (0, common_1.Patch)(constants_routes_1.constTexts.commentRoute.update),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, 'User'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comments_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Your Comments' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comments Deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, 'User'),
    (0, common_1.Delete)(constants_routes_1.constTexts.commentRoute.delete),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, 'User'),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View Post Comments Only' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post Comments Retrived successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, 'User'),
    (0, common_1.Get)(constants_routes_1.constTexts.commentRoute.getPostComments),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getPostComments", null);
CommentController = __decorate([
    (0, common_1.Controller)(constants_routes_1.constTexts.commentRoute.name),
    (0, swagger_1.ApiTags)(constants_routes_1.constTexts.commentRoute.name),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comments.controller.js.map