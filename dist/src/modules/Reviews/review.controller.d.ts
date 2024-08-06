import { ReviewsService } from './review.service';
import { CreateReviewDto } from './Dto/create.review.dto';
import { User } from 'src/modules/user/schema/user.schema';
import { Review } from './schema/review.schema';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(revieweeId: string, createReviewDto: CreateReviewDto, user: User): Promise<Review>;
    findByRevieweeId(revieweeId: string): Promise<Review[]>;
}
