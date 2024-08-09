import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { NotificationType } from '../../casl/notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(
    senderId: string,
    recipientId: string,
    type: NotificationType,
    relatedIds: { postId?: string; commentId?: string; orderId?: string; messageId?: string; reviewId?: string } = {},
    contentParams?: any, // Add a parameter for dynamic content
  ): Promise<Notification> {
    const content = this.generateNotificationContent(type, contentParams);

    const notification = new this.notificationModel({
      senderId,
      recipientId,
      type,
      content,  // Store the generated content
      ...relatedIds,
    });

    return await notification.save();
  }

  private generateNotificationContent(type: NotificationType, params: any): string {
    switch (type) {
      case NotificationType.COMMENT_ON_POST:
        return `${params.userName} commented on your post.`;
      case NotificationType.REPLY_TO_COMMENT:
        return `${params.userName} replied to your comment.`;
      case NotificationType.ORDER_ASSIGNED:
        return `You have been assigned a new order by ${params.assignerName}.`;
      case NotificationType.ORDER_COMPLETED:
        return `Your order has been completed by ${params.completerName}.`;
      case NotificationType.USER_REVIEWED:
        return `${params.reviewerName} reviewed you.`;
      case NotificationType.USER_MESSAGE:
        return `${params.senderName} sent you a message.`;
      default:
        return 'You have a new notification.';
    }
  }
}
