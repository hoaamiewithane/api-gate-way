import { Module } from '@nestjs/common';
import { VesselService } from './vessel.service';
import { VesselController } from './vessel.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VESSEL_SERVICE } from '../constants';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: VESSEL_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gate-way-service',
            brokers: [`localhost:9092`],
          },
          consumer: {
            groupId: 'vessel-consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [VesselController],
  providers: [VesselService],
})
export class VesselModule {}
