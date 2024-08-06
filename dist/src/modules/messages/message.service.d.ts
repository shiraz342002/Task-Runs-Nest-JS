import { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/message.schema';
export declare class MessagesService {
    private readonly messageModel;
    constructor(messageModel: Model<MessageDocument>);
    createMessage(chatRoomId: string, senderId: string, content: string): Promise<Message>;
    findByChatRoomId(chatRoomId: string): Promise<Message[]>;
    findById(id: string): Promise<Message>;
    create(chatRoomId: string, userId: string, content: string): Promise<Message & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
