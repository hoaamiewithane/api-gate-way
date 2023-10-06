import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EditUserDto } from './dto/edit-user.dto';
import { AUTH_MICROSERVICE } from '../constants';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly gateWayClient: ClientKafka,
  ) {}

  findAll(params: {
    limit?: number;
    offset?: number;
    searchTerm?: string;
    role?: 'admin' | 'user';
  }) {
    return this.gateWayClient.send('list_user', params);
  }

  findOne(id: number) {
    return this.gateWayClient.send('find_one_user', id);
  }

  editUser(id: number, payload: EditUserDto) {
    return this.gateWayClient.send('edit_user', {
      id,
      role: payload?.role,
      profile: {
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        gender: payload?.gender,
      },
    });
  }

  async onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('list_user');
    this.gateWayClient.subscribeToResponseOf('find_one_user');
    this.gateWayClient.subscribeToResponseOf('edit_user');
    await this.gateWayClient.connect();
  }
}
