import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { UserService } from "../user/user.service";
export declare class OrderService {
    private orderModel;
    private readonly userService;
    constructor(orderModel: Model<Order>, userService: UserService);
    assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto: CreateOrderDto): Promise<Order>;
}
