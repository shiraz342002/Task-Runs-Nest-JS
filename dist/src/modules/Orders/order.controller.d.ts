import { User } from "../user/schema/user.schema";
import { Order } from "./Schema/order.schema";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    assignTask(user: User, TaskAssignedToId: string, CreateOrderDto: CreateOrderDto): Promise<Order>;
}
