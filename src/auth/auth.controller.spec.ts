import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_MICROSERVICE } from 'src/constants';
import { Partitioners } from 'kafkajs';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

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
                brokers: [process.env['BROKER_URL']],
              },
              consumer: {
                groupId: 'auth-consumer',
              },
              producer: {
                createPartitioner: Partitioners.LegacyPartitioner,
              },
            },
          },
        ]),
        JwtModule.register({
          global: true,
          secret: process.env['SECRET_KEY'],
          signOptions: { expiresIn: 3600 * 24 },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
