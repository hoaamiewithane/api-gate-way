import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { VesselService } from './vessel.service';

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

  @Get('')
  getList(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('searchTerm') searchTerm?: string,
  ) {
    try {
      return this.vesselService.getList({ limit, offset, searchTerm });
    } catch {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.vesselService.getById(+id);
    } catch {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() editShipDto: Partial<CreateVesselDto>,
  ) {
    try {
      return this.vesselService.updateShipById(+id, editShipDto);
    } catch {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
