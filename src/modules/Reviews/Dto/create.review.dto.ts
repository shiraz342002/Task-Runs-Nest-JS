import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsMongoId } from 'class-validator';

export class CreateReviewDto {
//   @ApiProperty({ description: 'ID of the reviewee (person being reviewed)' })
//   @IsNotEmpty()
//   @IsString()
//   revieweeId: Types.ObjectId;

  @ApiProperty({ description: 'Rating given by the reviewer', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review text' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The Post User has Completed',
    example: '60d21b4667d0d8992e610c85',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  postId: string;

}
