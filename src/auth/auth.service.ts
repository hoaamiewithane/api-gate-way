import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-auth.dto';

interface createUserResponse {
  message: string;
}
@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly gateWayClient: ClientKafka,
  ) {}
  createUser(data: CreateUserDto) {
    return this.gateWayClient.send<createUserResponse, CreateUserDto>(
      'get_user',
      data,
    );
  }
  loginUser() {
    return 'login';
  }
  onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('get_user');
  }
}
