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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("@nestjs/mongoose");
const user_update_dto_1 = require("../../auth/dto/user.update.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)(user_update_dto_1.UserUpdateDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(40),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name of User",
        title: "Name",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Email of User",
        title: "Email",
    }),
    (0, mongoose_1.Prop)({
        type: "string",
        required: false,
        trim: true,
        lowercase: true,
        default: "",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Password of User",
        title: "Password",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Information about User",
        title: "About",
    }),
    (0, mongoose_1.Prop)({ type: "string", default: "" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Avatar of User",
        title: "Avatar",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, default: "" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Phone",
        title: "Phone",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, default: "" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Address of the User",
        title: "Address",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Profession of the User",
        title: "Profession",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "profession", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Zip Code",
        title: "Zip Code",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "zip_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "City of the User",
        title: "City",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map