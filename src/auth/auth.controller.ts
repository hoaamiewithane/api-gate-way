import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserResponse } from './dto/create-auth.dto';

interface tokenPayload {
  sub: number;
  email: string;
  username: string;
  role: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  handleUserCreate(
    @Payload(ValidationPipe) data: CreateUserDto,
  ): Observable<createUserResponse> {
    try {
      return this.authService.createUser(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
