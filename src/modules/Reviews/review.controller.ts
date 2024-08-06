import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './Dto/create.review.dto';
import { ApiPageOkResponse, Auth, AuthUser } from 'src/decorators';
import { User } from 'src/modules/user/schema/user.schema';
import { Action } from 'src/casl/userRoles';
import { Review } from './schema/review.schema';
import { constTexts } from 'src/constants';

@Controller(constTexts.reviewsRoute.name)
@ApiTags(constTexts.reviewsRoute.name)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(constTexts.reviewsRoute.PostReview)
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review created successfully.', type: Review })
  @Auth(Action.Create, "Review")
  async create(
    @Param('revieweeId') revieweeId: string,
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser() user: User,
  ) {
    return this.reviewsService.create(user.id,revieweeId,createReviewDto);
  }
  @Auth(Action.Read, "Review")
  @Get(constTexts.reviewsRoute.getOne)
  @ApiOperation({ summary: 'Get reviews by reviewee ID' })
  @ApiResponse({ status: 200, description: 'Reviews fetched successfully.', type: [Review] })
  async findByRevieweeId(@Param('id') id: string) {
    
    return this.reviewsService.findById(id);
  }

  @Delete(constTexts.reviewsRoute.delete)
  @Auth(Action.Delete,"Review")
  @ApiOperation({ summary: 'Delete Your  review By ID' })
  @ApiResponse({ status: 200, description: 'Review Deleted successfully.',})
  async DeleteReviewById(@Param('id')id:string,@AuthUser() user: User ){
    return this.reviewsService.deleteReview(user.id,id)
  }

  @Get(constTexts.reviewsRoute.getMyReviews)
  @ApiPageOkResponse({
    description: "View Other User Profile",
    type:Review
  })
  @Auth(Action.Read, "Reviews")
  async getProfileReviews(@AuthUser() user: User): Promise<any> {
    return this.reviewsService.getProfileReviews(user.id);
  }

  @Get(constTexts.reviewsRoute.getReviewsById)
  @ApiPageOkResponse({
    description: "View Reviews By ID",
    type: Review,
  })
  @Auth(Action.Read, "Reviews")
  async getReviewsById(@Param('id') id: string, @AuthUser() user: User): Promise<any> {
    return this.reviewsService.getProfileReviews(id);
  }
  
}
