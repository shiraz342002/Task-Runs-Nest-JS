import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schema/review.schema';
import { CreateReviewDto } from './Dto/create.review.dto';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notifications/notification.service';
export declare class ReviewsService {
    private readonly reviewModel;
    private readonly userService;
    private readonly notificationService;
    constructor(reviewModel: Model<ReviewDocument>, userService: UserService, notificationService: NotificationService);
    create(reviewerId: string, revieweeId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    findByRevieweeId(revieweeId: string): Promise<Review[]>;
    findById(id: string): Promise<Review>;
    deleteReview(userId: string, reviewId: string): Promise<Review>;
    getProfileReviews(userId: string): Promise<any>;
}
