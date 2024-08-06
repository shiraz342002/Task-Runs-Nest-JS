"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomModule = void 0;
const common_1 = require("@nestjs/common");
const chatRoom_service_1 = require("./chatRoom.service");
const chatRoom_controller_1 = require("./chatRoom.controller");
const chatRoom_schema_1 = require("./schema/chatRoom.schema");
const mongoose_1 = require("@nestjs/mongoose");
const chat_gateway_1 = require("../../../chat.gateway");
const messages_module_1 = require("../messages/messages.module");
let ChatRoomModule = class ChatRoomModule {
};
ChatRoomModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'ChatRoom', schema: chatRoom_schema_1.ChatRoomSchema }]),
            messages_module_1.MessagesModule],
        providers: [chatRoom_service_1.ChatRoomService, chat_gateway_1.ChatGateway],
        controllers: [chatRoom_controller_1.ChatRoomController],
    })
], ChatRoomModule);
exports.ChatRoomModule = ChatRoomModule;
//# sourceMappingURL=chat-room.module.js.map