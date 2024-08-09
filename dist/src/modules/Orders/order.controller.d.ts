import { User } from "../user/schema/user.schema";
import { Order } from "./Schema/order.schema";
import { AssignOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    assignTask(user: User, TaskAssignedToId: string, CreateOrderDto: AssignOrderDto): Promise<Order>;
    getOrderInfo(orderId: string): Promise<Order>;
    cancelOrder(orderId: string, user: User): Promise<any>;
    completeOrder(user: User, orderId: string): Promise<Order>;
}
