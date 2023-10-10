import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Partitioners } from 'kafkajs';
import { VESSEL_SERVICE } from 'src/constants';
import { VesselService } from './vessel.service';

describe('VesselService', () => {
  let service: VesselService;

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
      providers: [VesselService],
    }).compile();

    service = module.get<VesselService>(VesselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
