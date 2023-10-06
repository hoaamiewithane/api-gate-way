import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { VESSEL_SERVICE } from '../constants';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class VesselService implements OnModuleInit {
  constructor(
    @Inject(VESSEL_SERVICE) private readonly gateWayClient: ClientKafka,
  ) {}

  createShip(createVesselDto: CreateVesselDto) {
    return this.gateWayClient.send('create_ship', createVesselDto);
  }

  async onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('create_ship');
    await this.gateWayClient.connect();
  }
}
