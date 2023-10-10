import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Partitioners } from 'kafkajs';
import { AUTH_MICROSERVICE } from 'src/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminGuard } from 'src/auth/auth.adminGuard';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;

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
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
