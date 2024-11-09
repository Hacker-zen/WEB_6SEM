import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from 'src/chat/dto/create-message.dto';
import { MessageService } from 'src/chat/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(private readonly announceService: MessageService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  async handleMessage(@MessageBody() message: any) {
    const createMessageDto = new CreateMessageDto();
    createMessageDto.content = message.content;
    createMessageDto.userId = message.userId;
    const newMessage = await this.announceService.create(createMessageDto);
    this.server.emit('msgToClient', newMessage);
  }

  afterInit(Server: Server) {
    console.log(Server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
  }
}
