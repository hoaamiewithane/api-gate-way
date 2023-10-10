import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Partitioners } from 'kafkajs';
import { AUTH_MICROSERVICE } from '../constants';
import { JwtService } from '@nestjs/jwt';

@Module({
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
})
export class UserModule {}
