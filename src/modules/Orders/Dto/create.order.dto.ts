import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsDateString } from 'class-validator';

export class AssignOrderDto {
  @ApiProperty({
    description: 'The ID of the post related to the task',
    example: '60d21b4667d0d8992e610c85',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  PostId: string;

  @ApiProperty({
    description: 'The deadline for the task',
    example: '2024-08-31T23:59:59Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  deadline: string;
  
}

