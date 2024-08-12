import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";
import { AssignOrderDto } from "./Dto/create.order.dto";
import { UserService } from "../user/user.service";
import { PostsService } from "../posts/posts.service";
import { UpdateOrderDto } from "./Dto/update.order.dto";
import { NotificationService } from "../notifications/notification.service";
export declare class OrderService {
    private orderModel;
    private readonly userService;
    private readonly postService;
    private readonly notificationService;
    constructor(orderModel: Model<Order>, userService: UserService, postService: PostsService, notificationService: NotificationService);
    assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto: AssignOrderDto): Promise<Order>;
    getOrderInfo(userId: string, orderId: string): Promise<any>;
    cancelTask(userId: string, orderId: string): Promise<any>;
    completeOrder(userId: string, orderId: string): Promise<Order>;
    changeTask(userId: string, orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
}
