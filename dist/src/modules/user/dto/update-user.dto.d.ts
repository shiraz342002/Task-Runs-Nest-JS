import { UserUpdateDto } from "src/modules/auth/dto/user.update.dto";
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<UserUpdateDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    email: string;
    password: string;
    about: string;
    avatar: string;
    phone?: string;
    address?: string;
    profession?: string;
    zip_code?: number;
    city?: string;
}
export {};
