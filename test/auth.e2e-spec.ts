import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Partitioners } from 'kafkajs';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AUTH_MICROSERVICE } from 'src/constants';
import * as request from 'supertest';

describe('auth (e2e)', () => {
  let app: INestApplication;
  const testUser = {
    email: 'nguyendanghoaa1@gmail.com',
    password: 'qqqq1111',
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
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
      providers: [AuthService, JwtStrategy, GoogleStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 3000);

  it('/auth/sign-in (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(testUser)
      .expect(200);
  }, 2000);
});
