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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the service provider who is handling the order',
        example: '60d21b4667d0d8992e610c85',
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateOrderDto.prototype, "serviceProviderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the client who is placing the order',
        example: '60d21b4667d0d8992e610c85',
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateOrderDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the task for this order',
        example: false,
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "taskStatus", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create.order.dto.js.map