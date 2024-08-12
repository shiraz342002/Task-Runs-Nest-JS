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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comments_schema_1 = require("./schema/comments.schema");
const posts_service_1 = require("../posts/posts.service");
const mongoose_2 = require("mongoose");
const notification_service_1 = require("../notifications/notification.service");
const notification_1 = require("../../casl/notification");
let CommentsService = class CommentsService {
    constructor(commentModel, postService, Notificationservice) {
        this.commentModel = commentModel;
        this.postService = postService;
        this.Notificationservice = Notificationservice;
    }
    async addComment(postId, userId, content) {
        const post = await this.postService.findById(postId);
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comment = new this.commentModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            content,
        });
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        await this.Notificationservice.createNotification(userId, post.userId, notification_1.NotificationType.COMMENT_ON_POST, { postId, commentId: comment._id.toString() });
    }
    async replyComment(comentId, userId, content) {
        const orignal_coment = await this.commentModel.findById(comentId);
        if (!orignal_coment) {
            throw new common_1.HttpException('Comment not found or Deleted', common_1.HttpStatus.NOT_FOUND);
        }
        const reply = new this.commentModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            content,
        });
        await reply.save();
        orignal_coment.replies.push(reply._id);
        await orignal_coment.save();
        await this.Notificationservice.createNotification(userId, orignal_coment.userId.toString(), notification_1.NotificationType.REPLY_TO_COMMENT, { commentId: orignal_coment._id.toString() });
    }
    async getCommentWithReplies(commentId) {
        try {
            const comment = await this.commentModel
                .findById(commentId)
                .populate({
                path: 'userId',
                select: 'name avatar ratings',
            })
                .exec();
            if (!comment) {
                throw new common_1.NotFoundException('Comment not found');
            }
            ;
            async function fetchReplies(comment, commentModel) {
                if (!comment.replies || comment.replies.length === 0)
                    return comment;
                const replies = await commentModel.find({ '_id': { $in: comment.replies } })
                    .populate({
                    path: 'userId',
                    select: 'name avatar ratings',
                })
                    .exec();
                comment.replies = await Promise.all(replies.map(async (reply) => {
                    reply = await fetchReplies(reply, commentModel);
                    return reply;
                }));
                return comment;
            }
            return fetchReplies(comment, this.commentModel);
        }
        catch (error) {
            console.error('Error fetching comment with replies:', error);
            throw new Error('Failed to fetch comment with replies');
        }
    }
    async getPostCommentsWithReplies(postId) {
        const post = await this.postService.getPostWithPopulatedComments(postId);
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        async function fetchReplies(comment, commentModel) {
            if (!comment.replies || comment.replies.length === 0) {
                return comment;
            }
            const replies = await commentModel.find({ '_id': { $in: comment.replies } })
                .populate({
                path: 'userId',
                select: 'name avatar ratings',
            })
                .exec();
            comment.replies = await Promise.all(replies.map(async (reply) => {
                reply = await fetchReplies(reply, commentModel);
                return reply;
            }));
            return comment;
        }
        const comments = await this.commentModel.find({ _id: { $in: post.comments } })
            .populate({
            path: 'userId',
            select: 'name avatar ratings',
        })
            .exec();
        const commentsWithReplies = await Promise.all(comments.map(comment => fetchReplies(comment, this.commentModel)));
        return commentsWithReplies;
    }
    async updateComment(commentId, updatedComment) {
        return await this.commentModel.findByIdAndUpdate(commentId, updatedComment);
    }
    async deleteComment(commentId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException("No comment found");
        }
        return await this.commentModel.findByIdAndDelete(commentId);
    }
    async getOnlyCommentsByPostId(postId) {
        const post = await this.postService.findPostComments(postId);
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        const comments = await this.commentModel.find({ _id: { $in: post.comments } }).populate({
            path: 'userId',
            select: 'name avatar ratings'
        }).exec();
        return comments.map(comment => {
            const _a = comment.toObject(), { replies } = _a, commentWithoutReplies = __rest(_a, ["replies"]);
            return commentWithoutReplies;
        });
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        posts_service_1.PostsService,
        notification_service_1.NotificationService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map