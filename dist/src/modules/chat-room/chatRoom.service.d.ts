import { Model } from 'mongoose';
import { ChatRoom, ChatRoomDocument } from './schema/chatRoom.schema';
export declare class ChatRoomService {
    private readonly chatRoomModel;
    constructor(chatRoomModel: Model<ChatRoomDocument>);
    create(userId: string, recipientId: string): Promise<ChatRoom>;
    findById(id: string): Promise<ChatRoom>;
    findAll(): Promise<ChatRoom[]>;
}
