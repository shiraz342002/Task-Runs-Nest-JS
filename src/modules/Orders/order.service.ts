import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./Schema/order.schema";
import { AssignOrderDto } from "./Dto/create.order.dto";
import { UserService } from "../user/user.service";
import { PostsService } from "../posts/posts.service";

@Injectable()
export class OrderService {
constructor(
   @InjectModel(Order.name) private orderModel: Model<Order>,
   private readonly userService:UserService,
   private readonly postService:PostsService
) {}
 async assignTask(userId: string, TaskAssignedToId: string, CreateOrderDto:AssignOrderDto): Promise<Order> {    
  const order = new this.orderModel({
    TaskAssignedBy: userId,
    TaskAssignedTo: TaskAssignedToId,
   ...CreateOrderDto
  });
  const Assignedorder= await order.save();
  return Assignedorder
 }

 async getOrderInfo(orderId:string):Promise<any>{
   const order = await this.orderModel.findById(orderId).populate([{
      path: 'TaskAssignedBy',
      select: 'name avatar ratings'
   },
   {
     path: 'TaskAssignedTo',
     select: 'name avatar ratings'
   },
   {
      path:'PostId',
      select:'title description city isCompleted'
   },  

])
   if(!order){
      throw new NotFoundException("No Order Exsist");
   }
     return order
 }
 async cancelTask(userId:string,orderId:string):Promise<any>{
   console.log(orderId);
   const order=await this.orderModel.findById(orderId);
   if(!order){
      throw new NotFoundException("No Order Exsist");
   }
   if (order.TaskAssignedBy.toString() === userId) {
   return await this.orderModel.findByIdAndDelete(orderId)
   }
   else{
      throw new UnauthorizedException("You are now authorized to perform this operation")
    }
 }
 //We are meant to display Review page after this function is hit and is successfull
 async completeOrder(userId:string,orderId:string):Promise<Order>{
   const order = await this.orderModel.findById(orderId)
   const customer_id = order.TaskAssignedTo.toString();
   const service_provider_id = order.TaskAssignedBy.toString();
   const post_id=order.PostId.toString();
   if(!order){
      throw new NotFoundException("Cannot find this order")
   }
   if (order.TaskAssignedTo.toString()!== userId) {
      throw new UnauthorizedException("You are not authorized to complete this order.");
   }
   const updatedOrder= await this.orderModel.findByIdAndUpdate(orderId,
      {
      $set:{isCompleted:true}},{new:true},
   )
   await updatedOrder.save();
   await this.userService.incrementMyOrder(customer_id);
   await this.postService.changeisCompleteFlag(post_id)
   await this.userService.incrementTaskCompleted(service_provider_id)
   return updatedOrder
 }
}