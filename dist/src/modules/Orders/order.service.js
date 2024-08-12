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
const notification_service_1 = require("../notifications/notification.service");
const notification_1 = require("../../casl/notification");
let OrderService = class OrderService {
    constructor(orderModel, userService, postService, notificationService) {
        this.orderModel = orderModel;
        this.userService = userService;
        this.postService = postService;
        this.notificationService = notificationService;
    }
    async assignTask(userId, TaskAssignedToId, CreateOrderDto) {
        if (userId === TaskAssignedToId) {
            throw new common_1.InternalServerErrorException("Cannot Assign an order to yourself");
        }
        const order = new this.orderModel(Object.assign({ TaskAssignedBy: userId, TaskAssignedTo: TaskAssignedToId }, CreateOrderDto));
        const Assignedorder = await order.save();
        await this.notificationService.createNotification(userId, TaskAssignedToId, notification_1.NotificationType.ORDER_ASSIGNED, { postId: CreateOrderDto.PostId.toString(), orderId: Assignedorder.id });
        return Assignedorder;
    }
    async getOrderInfo(userId, orderId) {
        const validateorder = await this.orderModel.findById(orderId);
        if (validateorder.TaskAssignedBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You are not authoraized to view this Task");
        }
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
        const order = await this.orderModel.findById(orderId);
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
        await this.postService.changeIsCompleteFlag(post_id);
        await this.userService.incrementTaskCompleted(service_provider_id);
        await this.notificationService.createNotification(service_provider_id, customer_id, notification_1.NotificationType.ORDER_COMPLETED, { postId: post_id, orderId: orderId });
        return updatedOrder;
    }
    async changeTask(userId, orderId, updateOrderDto) {
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException("Order Does not exsist or deleted ");
        }
        console.log(order);
        if (order.TaskAssignedBy.toString() !== userId) {
            throw new common_1.UnauthorizedException("You are not authorized to complete this order.");
        }
        const updated_order = await this.orderModel.findByIdAndUpdate(orderId, {
            $set: updateOrderDto
        }, { new: true });
        return updated_order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        posts_service_1.PostsService,
        notification_service_1.NotificationService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map