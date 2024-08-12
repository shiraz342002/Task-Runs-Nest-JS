import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./schema/notification.schema";
import { NotificationService } from "./notification.service";
import { UserModule } from "../user/user.module";
import { NotificationController } from "./notification.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers:[NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
