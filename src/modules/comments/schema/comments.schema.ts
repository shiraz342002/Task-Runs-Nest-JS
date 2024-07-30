import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @IsString()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @Prop({ type: String, required: true })
  content: string;

  @IsArray()
  @ApiProperty({ type: [Object], description: 'Replies to the comment' })
  @Prop({ type: [this], default: [] })
  replies: Comment[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
