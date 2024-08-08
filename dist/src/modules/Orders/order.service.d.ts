import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto: any): Promise<Order>;
}
