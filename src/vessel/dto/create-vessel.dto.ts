import { IsNotEmpty } from 'class-validator';

export class CreateVesselDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  maxWeight: number;
  @IsNotEmpty()
  users: number[];
}
