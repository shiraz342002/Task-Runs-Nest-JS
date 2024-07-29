import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./order.schema";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
    controllers: [],
    providers: [],
    exports: [],
  })
  export class OrdersModule { }