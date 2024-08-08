import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action } from "src/casl/userRoles";
import {  Auth, AuthUser } from 'src/decorators';
import { constTexts } from "src/constants";
import { User } from "../user/schema/user.schema";
import { Order } from "./Schema/order.schema";
import { CreateOrderDto } from "./Dto/create.order.dto";
import { OrderService } from "./order.service";

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
@Body()CreateOrderDto:CreateOrderDto,
):Promise<Order>{
    const order = await this.orderService.assignTask(user.id,TaskAssignedToId,CreateOrderDto)
    return order
}
}