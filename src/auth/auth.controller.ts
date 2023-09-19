import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, createUserResponse } from './dto/create-auth.dto';
import { SignInUserDto } from './dto/sign-in-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
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

  @UseGuards(AuthGuard)
  @Get('me')
  handleGetMe(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')?.[1];
    return this.authService.getMe(token);
  }
}
