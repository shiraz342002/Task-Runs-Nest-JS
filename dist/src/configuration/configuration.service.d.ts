import type { MongooseModuleOptions } from "@nestjs/mongoose";
export declare class ConfigurationService {
    get mongooseConfig(): MongooseModuleOptions;
    get authConfig(): {
        privateKey: string;
        publicKey: string;
    };
    get documentationEnabled(): string;
    get userReputationConfig(): {
        upVote: string;
        downVote: string;
        updateUpVote: string;
        updateDownVote: string;
    };
    get firebaseServerKeyConfig(): {
        firebaseServerKey: string;
    };
    get appConfig(): {
        port: string | number;
    };
    get sendGridConfig(): {
        host: string;
        secure: string | boolean;
        port: string | number;
        user: string;
        password: string;
        email: string;
    };
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get isTest(): boolean;
    get nodeEnv(): string;
}
