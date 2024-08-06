import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schema/message.schema';
import { constTexts } from 'src/constants';
import { Action } from 'src/casl/userRoles';
import { Auth, AuthUser } from 'src/decorators';
import { User } from '../user/schema/user.schema';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(constTexts.messageRoute.create)
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.', type: Message })
  @Auth(Action.Create, "Post")
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @AuthUser() user: User,
    @Param('chatId')chatId:string,
  ) {
    console.log("controller running");
    return this.messagesService.create(chatId,user.id,createMessageDto.content);
  }

  @Get(':chatRoomId')
  @ApiOperation({ summary: 'Get messages by chat room ID' })
  @ApiResponse({ status: 200, description: 'List of messages in the chat room.', type: [Message] })
  async findByChatRoomId(@Param('chatRoomId') chatRoomId: string) {
    return this.messagesService.findByChatRoomId(chatRoomId);
  }
}
