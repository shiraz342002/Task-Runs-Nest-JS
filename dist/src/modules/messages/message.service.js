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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./schema/message.schema");
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async createMessage(chatRoomId, senderId, content) {
        const createMessageDto = { chatRoomId, senderId, content };
        const message = new this.messageModel(createMessageDto);
        return message.save();
    }
    async findByChatRoomId(chatRoomId) {
        return this.messageModel.find({ chatRoomId }).exec();
    }
    async findById(id) {
        const message = await this.messageModel.findById(id).exec();
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async create(chatRoomId, userId, content) {
        console.log(chatRoomId);
        console.log(userId);
        console.log(content);
        const message = { chatRoomId, userId, content };
        return this.messageModel.create(message);
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=message.service.js.map