import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VesselService } from './vessel.service';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('vessel')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Post('create-ship')
  create(@Body() createVesselDto: CreateVesselDto) {
    return this.vesselService.createShip(createVesselDto);
  }
}
