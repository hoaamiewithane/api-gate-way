import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { SocketService } from './socket.service';

@WebSocketGateway(8001, { cors: true })
export class SocketGateway implements OnGatewayInit {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('newUser')
  newUser() {
    return this.socketService.create();
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }

  afterInit() {
    return '';
  }
}
