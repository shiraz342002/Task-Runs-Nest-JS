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
exports.ChatRoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chatRoom_service_1 = require("./chatRoom.service");
const chatRoom_schema_1 = require("./schema/chatRoom.schema");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/schema/user.schema");
const userRoles_1 = require("../../casl/userRoles");
let ChatRoomController = class ChatRoomController {
    constructor(chatRoomService) {
        this.chatRoomService = chatRoomService;
    }
    async create(id, user) {
        return this.chatRoomService.create(user.id, id);
    }
    async findById(id) {
        return this.chatRoomService.findById(id);
    }
};
__decorate([
    (0, common_1.Post)(constants_1.constTexts.chatRoute.create),
    (0, swagger_1.ApiOperation)({ summary: 'Create a chat room' }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The chat room has been successfully created.', type: chatRoom_schema_1.ChatRoom }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ChatRoomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chat room by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chat room details.', type: chatRoom_schema_1.ChatRoom }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatRoomController.prototype, "findById", null);
ChatRoomController = __decorate([
    (0, swagger_1.ApiTags)('chat-room'),
    (0, common_1.Controller)('chat-room'),
    __metadata("design:paramtypes", [chatRoom_service_1.ChatRoomService])
], ChatRoomController);
exports.ChatRoomController = ChatRoomController;
//# sourceMappingURL=chatRoom.controller.js.map