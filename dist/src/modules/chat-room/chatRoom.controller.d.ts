import { ChatRoomService } from './chatRoom.service';
import { ChatRoom } from './schema/chatRoom.schema';
import { User } from '../user/schema/user.schema';
export declare class ChatRoomController {
    private readonly chatRoomService;
    constructor(chatRoomService: ChatRoomService);
    create(id: string, user: User): Promise<ChatRoom>;
    findById(id: string): Promise<ChatRoom>;
}
