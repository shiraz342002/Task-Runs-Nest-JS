import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./schema/notification.schema";
import { NotificationService } from "./notification.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
