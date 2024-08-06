import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schema/message.schema';
import { User } from '../user/schema/user.schema';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, user: User, chatId: string): Promise<Message & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByChatRoomId(chatRoomId: string): Promise<Message[]>;
}
