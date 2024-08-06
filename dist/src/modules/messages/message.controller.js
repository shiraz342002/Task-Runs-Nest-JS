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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const message_service_1 = require("./message.service");
const createMessage_dto_1 = require("./dto/createMessage.dto");
const message_schema_1 = require("./schema/message.schema");
const constants_1 = require("../../constants");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/schema/user.schema");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async create(createMessageDto, user, chatId) {
        console.log("controller running");
        return this.messagesService.create(chatId, user.id, createMessageDto.content);
    }
    async findByChatRoomId(chatRoomId) {
        return this.messagesService.findByChatRoomId(chatRoomId);
    }
};
__decorate([
    (0, common_1.Post)(constants_1.constTexts.messageRoute.create),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sent successfully.', type: message_schema_1.Message }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.AuthUser)()),
    __param(2, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMessage_dto_1.CreateMessageDto,
        user_schema_1.User, String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':chatRoomId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages by chat room ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of messages in the chat room.', type: [message_schema_1.Message] }),
    __param(0, (0, common_1.Param)('chatRoomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "findByChatRoomId", null);
MessagesController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [message_service_1.MessagesService])
], MessagesController);
exports.MessagesController = MessagesController;
//# sourceMappingURL=message.controller.js.map