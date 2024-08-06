import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schema/review.schema';
import { CreateReviewDto } from './Dto/create.review.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
    private readonly userService: UserService,
  ) {}

  async create(reviewerId: string,revieweeId:string,createReviewDto: CreateReviewDto): Promise<Review> {
    const review = new this.reviewModel({
        reviewerId,
        revieweeId,
      ...createReviewDto,
    });
    const savedReview = await review.save();
    await this.userService.updateReviews(revieweeId,savedReview.id)
    await this.userService.CalcRatings(revieweeId,createReviewDto.rating)
    return savedReview
  }

  async findByRevieweeId(revieweeId: string): Promise<Review[]> {
    return this.reviewModel.find({ revieweeId }).exec();
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async deleteReview(userId: string, reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    const reviewUserId = new Types.ObjectId(review.reviewerId);
    const userObjectId = new Types.ObjectId(userId);
    if (!reviewUserId.equals(userObjectId)) {
      throw new ForbiddenException('You do not have permission to delete this review');
    }
    await this.reviewModel.findByIdAndDelete(reviewId);
    await this.userService.removeReviewFromUser(userId, reviewId);
    return review
  }
}

