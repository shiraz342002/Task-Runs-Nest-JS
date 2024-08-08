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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./Dto/create.review.dto");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/schema/user.schema");
const userRoles_1 = require("../../casl/userRoles");
const review_schema_1 = require("./schema/review.schema");
const constants_1 = require("../../constants");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(revieweeId, createReviewDto, user) {
        return this.reviewsService.create(user.id, revieweeId, createReviewDto);
    }
    async findByRevieweeId(reviewId) {
        return this.reviewsService.findById(reviewId);
    }
    async DeleteReviewById(id, user) {
        return this.reviewsService.deleteReview(user.id, id);
    }
    async getProfileReviews(user) {
        return await this.reviewsService.getProfileReviews(user.id);
    }
    async getReviewsById(id, user) {
        return this.reviewsService.getProfileReviews(id);
    }
};
__decorate([
    (0, common_1.Post)(constants_1.constTexts.reviewsRoute.PostReview),
    (0, swagger_1.ApiOperation)({ summary: 'Create a review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully.', type: review_schema_1.Review }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Review"),
    __param(0, (0, common_1.Param)('revieweeId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_review_dto_1.CreateReviewDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Review"),
    (0, common_1.Get)(constants_1.constTexts.reviewsRoute.getOne),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by reviewee ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews fetched successfully.', type: [review_schema_1.Review] }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findByRevieweeId", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.reviewsRoute.delete),
    (0, decorators_1.Auth)(userRoles_1.Action.Delete, "Review"),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Your  review By ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review Deleted successfully.', }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "DeleteReviewById", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.reviewsRoute.getMyReviews),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View User's Reviews",
        type: review_schema_1.Review,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getProfileReviews", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.reviewsRoute.getReviewsById),
    (0, decorators_1.ApiPageOkResponse)({
        description: "View Reviews By ID",
        type: review_schema_1.Review,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Review"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsById", null);
ReviewsController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.reviewsRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.reviewsRoute.name),
    __metadata("design:paramtypes", [review_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=review.controller.js.map