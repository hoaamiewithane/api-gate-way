import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
  // Req,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  createUserResponse,
  googleRequest,
} from './dto/create-auth.dto';
import { SignInUserDto } from './dto/sign-in-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';

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

  @Post('sign-in2')
  handleSignInUser2() {
    return this.authService.signInUser2();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  handleGetMe(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')?.[1];
    return this.authService.getMe(token);
  }
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
    return null;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: googleRequest) {
    return this.authService.loginWithGoogle(req);
  }
}
