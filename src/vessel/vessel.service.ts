import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { VESSEL_SERVICE } from '../constants';
import { CreateVesselDto } from './dto/create-vessel.dto';

@Injectable()
export class VesselService implements OnModuleInit {
  constructor(
    @Inject(VESSEL_SERVICE) private readonly gateWayClient: ClientKafka,
  ) {}

  createShip(createVesselDto: CreateVesselDto) {
    return this.gateWayClient.send('create_ship', createVesselDto);
  }

  getList(param: any) {
    return this.gateWayClient.send('get_ships', param);
  }

  getById(id: number) {
    return this.gateWayClient.send('get_ship_by_id', id);
  }

  updateShipById(id: number, updateShipDto: Partial<CreateVesselDto>) {
    return this.gateWayClient.send('update_ship', { id, ...updateShipDto });
  }

  async onModuleInit() {
    this.gateWayClient.subscribeToResponseOf('create_ship');
    this.gateWayClient.subscribeToResponseOf('get_ship_by_id');
    this.gateWayClient.subscribeToResponseOf('update_ship');
    this.gateWayClient.subscribeToResponseOf('get_ships');
    await this.gateWayClient.connect();
  }
}
