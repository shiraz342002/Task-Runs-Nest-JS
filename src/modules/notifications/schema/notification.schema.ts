import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  postId?: string;

  @Prop({ required: false })
  commentId?: string;

  @Prop({ required: false })
  orderId?: string;

  @Prop({ required: false })
  messageId?: string;

  @Prop({ required: false })
  reviewId?: string; // Added reviewId field

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
