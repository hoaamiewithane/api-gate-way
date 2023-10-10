import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Partitioners } from 'kafkajs';
import { AUTH_MICROSERVICE } from 'src/constants';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: AUTH_MICROSERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'gate-way-service',
                brokers: [`localhost:9092`],
              },
              consumer: {
                groupId: 'user-consumer',
              },
              producer: {
                createPartitioner: Partitioners.LegacyPartitioner,
              },
            },
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
