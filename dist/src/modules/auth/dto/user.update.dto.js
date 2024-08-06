"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../user/schema/user.schema");
class UserUpdateDto extends (0, swagger_1.PickType)(user_schema_1.User, [
    "name",
    "email",
    "password",
    "city",
    "address",
    "zip_code",
    "phone",
    "avatar",
    "about",
    "profession",
    ,
]) {
}
exports.UserUpdateDto = UserUpdateDto;
//# sourceMappingURL=user.update.dto.js.map