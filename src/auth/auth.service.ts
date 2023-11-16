import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_MICROSERVICE } from 'src/constants';
import { CreateUserDto } from './dto/create-auth.dto';

interface createUserResponse {
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientProxy,
  ) {}

  createUser(payload: CreateUserDto) {
    const pattern = { cmd: 'create_user' };
    return this.authClient.send<createUserResponse, CreateUserDto>(
      pattern,
      payload,
    );
  }
}
