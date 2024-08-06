"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptionsPostImages = exports.multerOptionsAvatar = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerOptionsAvatar = {
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.join)('src/Assets/UserAvatar'),
        filename: (req, file, callback) => {
            const filename = file.originalname;
            callback(null, filename);
        },
    }),
};
exports.multerOptionsPostImages = {
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.join)('src/Assets/PostImages'),
        filename: (req, file, callback) => {
            const filename = file.originalname;
            callback(null, filename);
        },
    }),
};
//# sourceMappingURL=multer.config.js.map