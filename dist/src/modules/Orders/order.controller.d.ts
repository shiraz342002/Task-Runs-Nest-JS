import { User } from "../user/schema/user.schema";
import { Order } from "./Schema/order.schema";
import { AssignOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";
import { UpdateOrderDto } from "./Dto/update.order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    assignTask(user: User, TaskAssignedToId: string, CreateOrderDto: AssignOrderDto): Promise<Order>;
    completeOrder(user: User, orderId: string): Promise<Order>;
    getOrderInfo(orderId: string, user: User): Promise<Order>;
    changeTask(orderId: string, user: User, CreateOrderDto: UpdateOrderDto): Promise<Order>;
    cancelOrder(orderId: string, user: User): Promise<any>;
}
