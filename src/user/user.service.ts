import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly gateWayClient: ClientKafka,
  ) {}
  findAll() {
    return this.gateWayClient.send('find_all_user', 'find_all_user');
  }

  findOne(id: number) {
    return this.gateWayClient.send('find_one_user', id);
  }

  onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('find_all_user');
    this.gateWayClient.subscribeToResponseOf('find_one_user');
  }
}
