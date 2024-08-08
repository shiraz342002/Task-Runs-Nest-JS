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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./schema/review.schema");
const user_service_1 = require("../user/user.service");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, userService) {
        this.reviewModel = reviewModel;
        this.userService = userService;
    }
    async create(reviewerId, revieweeId, createReviewDto) {
        if (revieweeId == revieweeId) {
            throw new common_1.InternalServerErrorException("Cannot Post Reviews On Your Own Profile");
        }
        const review = new this.reviewModel(Object.assign({ reviewerId,
            revieweeId }, createReviewDto));
        const savedReview = await review.save();
        await this.userService.updateReviews(revieweeId, savedReview.id);
        await this.userService.CalcRatings(revieweeId, createReviewDto.rating);
        return savedReview;
    }
    async findByRevieweeId(revieweeId) {
        return this.reviewModel.find({ revieweeId }).exec();
    }
    async findById(id) {
        const review = await this.reviewModel.findById(id).exec();
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async deleteReview(userId, reviewId) {
        const review = await this.reviewModel.findById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        const reviewUserId = new mongoose_2.Types.ObjectId(review.reviewerId);
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        if (!reviewUserId.equals(userObjectId)) {
            throw new common_1.ForbiddenException('You do not have permission to delete this review');
        }
        await this.reviewModel.findByIdAndDelete(reviewId);
        await this.userService.removeReviewFromUser(userId, reviewId);
        return review;
    }
    async getProfileReviews(userId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                throw new common_1.BadRequestException('Invalid user ID format');
            }
            return await this.userService.getProfileReviews(userId);
        }
        catch (error) {
            console.error('Error in ReviewsService.getProfileReviews:', error);
            throw new common_1.InternalServerErrorException('An error occurred while fetching user reviews');
        }
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=review.service.js.map