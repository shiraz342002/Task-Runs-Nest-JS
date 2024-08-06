"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
let ConfigurationService = class ConfigurationService {
    get mongooseConfig() {
        return {
            uri: process.env.MONGODB_URI,
        };
    }
    get authConfig() {
        return {
            privateKey: process.env.JWT_PRIVATE_KEY,
            publicKey: process.env.JWT_PUBLIC_KEY || "boilerplat",
        };
    }
    get documentationEnabled() {
        return process.env.ENABLE_DOCUMENTATION;
    }
    get userReputationConfig() {
        return {
            upVote: process.env.USER_REPUTATION_UPVOTE,
            downVote: process.env.USER_REPUTATION_DOWNVOTE,
            updateUpVote: process.env.USER_REPUTATION_UPDATEUPVOTE,
            updateDownVote: process.env.USER_REPUTATION_UPDATEDOWNVOTE,
        };
    }
    get firebaseServerKeyConfig() {
        return {
            firebaseServerKey: process.env.FIREBASE_SERVER_KEY,
        };
    }
    get appConfig() {
        return {
            port: process.env.PORT || 3000,
        };
    }
    get sendGridConfig() {
        return {
            host: process.env.SEND_GRID_HOST || "smtp.sendgrid.net",
            secure: process.env.SEND_GRID_SECURE || false,
            port: process.env.SEND_GRID_PORT || 587,
            user: process.env.SEND_GRID_USER || "apikey",
            password: process.env.SEND_GRID_PASS ||
                "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",
            email: process.env.SEND_GRID_EMAIL || "afaq.ahmad.developer@gmail.com",
        };
    }
    get isDevelopment() {
        return this.nodeEnv === "development";
    }
    get isProduction() {
        return this.nodeEnv === "production";
    }
    get isTest() {
        return this.nodeEnv === "test";
    }
    get nodeEnv() {
        return process.env.NODE_ENV || "development";
    }
};
ConfigurationService = __decorate([
    (0, common_1.Injectable)()
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map