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
exports.userJsonSchema = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const utils_1 = require("../../common/utils");
const role_type_1 = require("../../constants/role-type");
let User = class User {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(40),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name of User",
        title: "Name",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
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
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Password of User",
        title: "Password",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Information about User",
        title: "About",
    }),
    (0, mongoose_1.Prop)({ type: "string", default: "" }),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User email verification",
        title: "Email Verify",
    }),
    (0, mongoose_1.Prop)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verify", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_type_1.RoleType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Role of User",
        title: "Role",
    }),
    (0, mongoose_1.Prop)({ type: "string", required: false, trim: true, default: role_type_1.RoleType.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: "string", trim: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: "Boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOtpUsed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({
        description: "Avatar of User",
        title: "Avatar",
        type: 'string',
        format: 'binary',
        required: true,
    }),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Avatar of User",
        title: "Avatar",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "phone",
        title: "phone",
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Address of the User",
        title: "Address"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Profession of the User",
        title: "Profession"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false }),
    __metadata("design:type", String)
], User.prototype, "profession", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Completed Task of the User",
        title: "Completed Task"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "task_completed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Completed Order of the User",
        title: "Completed Order"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "my_orders", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(5),
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Rating of the User",
        title: "Rating"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "ratings", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Zip Code",
        title: "Zip Code"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", Number)
], User.prototype, "zip_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "City of the User",
        title: "City"
    }),
    (0, mongoose_1.Prop)({ type: "string", trim: true, required: false, default: "" }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], User);
exports.User = User;
const UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema = UserSchema;
UserSchema.index({ userName: "text" });
UserSchema.pre("save", async function (next) {
    this.password = (0, utils_1.generateHash)(this.password);
    this.email = this.email.toLowerCase();
    next();
});
UserSchema.virtual("id").get(function () {
    return this._id.toString();
});
exports.userJsonSchema = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)();
//# sourceMappingURL=user.schema.js.map