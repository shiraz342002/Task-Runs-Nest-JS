import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";



@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) { }
    async assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto): Promise<Order> {
        const review = this.orderModel.({
            userId,
            TaskAssignedToId,
            ...CreateOrderDto
        });
        return review
    }
}