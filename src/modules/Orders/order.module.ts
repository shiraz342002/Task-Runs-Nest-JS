import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./Schema/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { UserModule } from "../user/user.module";
import { PostsModule } from "../posts/posts.module";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UserModule,PostsModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
  })
  export class OrdersModule { }