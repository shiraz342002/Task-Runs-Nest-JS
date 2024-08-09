"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./Schema/order.schema");
const user_service_1 = require("../user/user.service");
const posts_service_1 = require("../posts/posts.service");
let OrderService = class OrderService {
    constructor(orderModel, userService, postService) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.postService = postService;
    }
    async assignTask(userId, TaskAssignedToId, CreateOrderDto) {
        const order = new this.orderModel(Object.assign({ TaskAssignedBy: userId, TaskAssignedTo: TaskAssignedToId }, CreateOrderDto));
        const Assignedorder = await order.save();
        return Assignedorder;
    }
    async getOrderInfo(orderId) {
        const order = await this.orderModel.findById(orderId).populate([{
                path: 'TaskAssignedBy',
                select: 'name avatar ratings'
            },
            {
                path: 'TaskAssignedTo',
                select: 'name avatar ratings'
            },
            {
                path: 'PostId',
                select: 'title description city isCompleted'
            },
        ]);
        if (!order) {
            throw new common_1.NotFoundException("No Order Exsist");
        }
        return order;
    }
    async cancelTask(userId, orderId) {
        console.log(orderId);
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException("No Order Exsist");
        }
        if (order.TaskAssignedBy.toString() === userId) {
            return await this.orderModel.findByIdAndDelete(orderId);
        }
        else {
            throw new common_1.UnauthorizedException("You are now authorized to perform this operation");
        }
    }
    async completeOrder(userId, orderId) {
        console.log("Idhar taq chal raha ?");
        console.log("OrderId:" + orderId);
        const order = await this.orderModel.findById(orderId);
        console.log(order);
        const customer_id = order.TaskAssignedBy.toString();
        const service_provider_id = order.TaskAssignedTo.toString();
        const post_id = order.PostId.toString();
        if (!order) {
            throw new common_1.NotFoundException("Cannot find this order");
        }
        if (order.TaskAssignedTo.toString() !== userId) {
            throw new common_1.UnauthorizedException("You are not authorized to complete this order.");
        }
        const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, {
            $set: { isCompleted: true,
                deadline: null
            }
        }, { new: true });
        await updatedOrder.save();
        await this.userService.incrementMyOrder(customer_id);
        await this.postService.changeisCompleteFlag(post_id);
        await this.userService.incrementTaskCompleted(service_provider_id);
        return updatedOrder;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        posts_service_1.PostsService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map