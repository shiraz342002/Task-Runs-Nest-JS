import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  senderId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  recipientId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PostEntity', required: false })
  postId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment', required: false })
  commentId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: false })
  orderId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Message', required: false })
  messageId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Review', required: false })
  reviewId?: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
