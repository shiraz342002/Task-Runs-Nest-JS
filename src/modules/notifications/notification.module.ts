import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Notification, NotificationSchema } from "./schema/notification.schema";
import { NotificationService } from "./notification.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    UserModule],
    controllers: [],
    providers: [NotificationService],
    exports: [NotificationService],
  })
  export class NotificationModule { }