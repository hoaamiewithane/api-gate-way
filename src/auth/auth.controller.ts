import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
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

  @Post('sign-up')
  @HttpCode(201)
  handleUserCreate(
    @Payload(ValidationPipe) data: CreateUserDto,
  ): Observable<createUserResponse> {
    try {
      return this.authService.createUser(data);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('sign-in')
  handleSignInUser(
    @Payload(ValidationPipe) data: SignInUserDto,
  ): Observable<createUserResponse> {
    try {
      return this.authService.signInUser(data);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  handleGetMe(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')?.[1];
    try {
      return this.authService.getMe(token);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
    return null;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: googleRequest) {
    try {
      return this.authService.loginWithGoogle(req);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
