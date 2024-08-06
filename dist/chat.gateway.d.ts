import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './src/modules/messages/message.service';
import { CreateMessageDto } from './src/modules/messages/dto/createMessage.dto';
import { User } from 'src/modules/user/schema/user.schema';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    constructor(messageService: MessagesService);
    private server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(createMessageDto: CreateMessageDto, client: Socket, user: User): Promise<void>;
    handleJoinRoom(chatRoomId: string, client: Socket): void;
    handleLeaveRoom(chatRoomId: string, client: Socket): void;
}
