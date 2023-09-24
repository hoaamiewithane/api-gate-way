import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_MICROSERVICE, MRV_PORT } from 'src/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_MICROSERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gate-way-service',
            brokers: [`localhost:${MRV_PORT}`],
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
      secret: process.env.SECRECT_KEY,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
