import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VesselModule } from './vessel/vessel.module';

@Module({
  imports: [AuthModule, UserModule, VesselModule],
})
export class AppModule {}
