import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface createUserResponse {
  message: string;
}

export interface googleRequest {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
  };
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
