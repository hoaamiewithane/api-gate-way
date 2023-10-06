import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { AUTH_MICROSERVICE } from 'src/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
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
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
