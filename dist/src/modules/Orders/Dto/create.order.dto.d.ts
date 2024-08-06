import { Types } from 'mongoose';
export declare class CreateOrderDto {
    readonly serviceProviderId: Types.ObjectId;
    readonly clientId: Types.ObjectId;
    readonly taskStatus?: boolean;
}
