import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_MICROSERVICE } from 'src/constants';
import { Partitioners } from 'kafkajs';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
