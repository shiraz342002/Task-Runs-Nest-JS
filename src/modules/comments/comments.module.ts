import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comments.schema';
import { PostsModule } from '../posts/posts.module';
import { CommentsService } from './comments.service';
import { CommentController } from './comments.controller';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), 
    PostsModule,NotificationModule, 
  ],
  providers: [CommentsService],
  controllers: [CommentController],
  exports: [CommentsService],
})

export class CommentsModule {}
