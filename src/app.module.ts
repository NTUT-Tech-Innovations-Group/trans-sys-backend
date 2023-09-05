import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, AppModule],
  controllers: [AppController],
})
export class AppModule {}
