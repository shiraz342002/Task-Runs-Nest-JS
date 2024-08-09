import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action } from "src/casl/userRoles";
import {  Auth, AuthUser } from 'src/decorators';
import { constTexts } from "src/constants";
import { User } from "../user/schema/user.schema";
import { Order } from "./Schema/order.schema";
import { AssignOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";
import { UpdateOrderDto } from "./Dto/update.order.dto";

@Controller(constTexts.orderMgmt.name)
@ApiTags(constTexts.orderMgmt.name)
export class OrderController{
    constructor(private readonly orderService: OrderService) { }

@Post(constTexts.orderMgmt.assignOrder)
@ApiOperation({summary:"Assign Task to a User"})
@ApiResponse({status:201,description:"Task Assigned Successfully"})
@Auth(Action.Create,"Order")
async assignTask(
@AuthUser()user:User,
@Param('TaskAssignedToId')TaskAssignedToId:string,
@Body()CreateOrderDto:AssignOrderDto,
):Promise<Order>{
    const order = await this.orderService.assignTask(user.id,TaskAssignedToId,CreateOrderDto)
    return order
}

@Post(constTexts.orderMgmt.completeTask)
@ApiOperation({summary:"Complete Assigned Task"})
@ApiResponse({status:201,description:"Task Completed Succeffully"})
@Auth(Action.Create,"Order")
async completeOrder(
@AuthUser()user:User,
@Param('orderId')orderId:string,
):Promise<Order>{
const completedOrder=await this.orderService.completeOrder(user.id,orderId)
return completedOrder
}


@Get(constTexts.orderMgmt.getOrderInfo)
@ApiOperation({summary:"Get Order Information "})
@ApiResponse({status:201,description:"Task Information Retrived Successfully"})
@Auth(Action.Read,"Order")
async getOrderInfo(
    @Param('orderId')orderId:string,
    @AuthUser()user:User
):Promise<Order>{
    const order = await this.orderService.getOrderInfo(user.id,orderId);
    return order
}

@Patch(constTexts.orderMgmt.changeOrder)
@ApiOperation({summary:"Change Task Details "})
@ApiResponse({status:201,description:"Task Updated Successfully"})
@Auth(Action.Read,"Order")
async changeTask(
    @Param('orderId')orderId:string,
    @AuthUser()user:User,
    @Body()CreateOrderDto:UpdateOrderDto,
):Promise<Order>{
    const updated_task= await this.orderService.changeTask(user.id,orderId,CreateOrderDto)
    return updated_task
}

@Delete(constTexts.orderMgmt.cancelTask)
@ApiOperation({summary:"Cancel Assigned Task"})
@ApiResponse({status:201,description:"Task Cancelled Successfully"})
@Auth(Action.Delete,"Order")
async cancelOrder(
@Param('orderId')orderId:string,
@AuthUser() user: User, 
):Promise<any>{
    console.log("Order Id: "+orderId);
    console.log("User Id: "+user.id);
    
const deletedTask= await this.orderService.cancelTask(user.id,orderId)
return deletedTask
}
}