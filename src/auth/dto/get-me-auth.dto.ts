import { IsNotEmpty, IsString } from 'class-validator';

export class GetMeDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
