import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly gateWayClient: ClientKafka,
  ) {}
  findAll(params) {
    return this.gateWayClient.send('list_user', params);
  }

  findOne(id: number) {
    return this.gateWayClient.send('find_one_user', id);
  }

  async onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('list_user');
    this.gateWayClient.subscribeToResponseOf('find_one_user');
    await this.gateWayClient.connect();
  }
}
