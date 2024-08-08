import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class OrderService {
constructor(
   @InjectModel(Order.name) private orderModel: Model<Order>,
   private readonly userService:UserService
) {}
 async assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto:CreateOrderDto): Promise<Order> {    
  const order = new this.orderModel({
    TaskAssignedBy: userId,
    TaskAssignedTo: TaskAssignedToId,
   ...CreateOrderDto
  });
  const Assignedorder= await order.save();
  await this.userService.incrementMyOrder(TaskAssignedToId);
  return Assignedorder
 }
}