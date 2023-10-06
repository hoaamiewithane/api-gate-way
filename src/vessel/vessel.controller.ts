import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { VesselService } from './vessel.service';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('vessel')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Post('create-ship')
  create(@Body(ValidationPipe) createVesselDto: CreateVesselDto) {
    try {
      return this.vesselService.createShip(createVesselDto);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
