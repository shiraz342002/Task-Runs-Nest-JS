import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schema/review.schema';
import { CreateReviewDto } from './Dto/create.review.dto';
import { UserService } from '../user/user.service';
export declare class ReviewsService {
    private readonly reviewModel;
    private readonly userService;
    constructor(reviewModel: Model<ReviewDocument>, userService: UserService);
    create(reviewerId: string, revieweeId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    findByRevieweeId(revieweeId: string): Promise<Review[]>;
    findById(id: string): Promise<Review>;
}
