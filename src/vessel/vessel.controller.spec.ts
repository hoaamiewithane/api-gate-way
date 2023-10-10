import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Partitioners } from 'kafkajs';
import { VESSEL_SERVICE } from 'src/constants';
import { VesselController } from './vessel.controller';
import { VesselService } from './vessel.service';

describe('VesselController', () => {
  let controller: VesselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<VesselController>(VesselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
