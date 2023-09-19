import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserResponse } from './dto/create-auth.dto';
import { SignInUserDto } from './dto/sign-in-auth.dto';

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
  handleSignInUser(
    @Payload(ValidationPipe) data: SignInUserDto,
  ): Observable<createUserResponse> {
    return this.authService.signInUser(data);
  }
}
