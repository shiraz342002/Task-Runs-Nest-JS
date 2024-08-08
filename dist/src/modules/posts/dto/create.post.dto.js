"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("../schema/post.schema");
class CreatePostDto extends (0, swagger_1.PickType)(post_schema_1.PostEntity, [
    'title',
    'description',
    'price',
    'obo',
    'location',
    'isUrgent',
    'isHelpFree',
    'streetAddress',
    'city',
    'zipCode',
    'state',
    'images',
    'userId',
]) {
}
exports.CreatePostDto = CreatePostDto;
//# sourceMappingURL=create.post.dto.js.map