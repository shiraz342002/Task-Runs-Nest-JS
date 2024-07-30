import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  content: string;
}

export class CreateReplyDto {
  @IsString()
  @ApiProperty()
  content: string;
}
