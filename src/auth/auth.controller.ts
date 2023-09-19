import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from '@nestjs/microservices';
import { CreateUserDto, createUserResponse } from './dto/create-auth.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  handleUserCreate(
    @Payload(ValidationPipe) data: CreateUserDto,
  ): Observable<createUserResponse> {
    return this.authService.createUser(data);
  }
  @Post('sign-in')
  loginUser() {
    return this.authService.loginUser();
  }
}
