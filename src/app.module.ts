import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { GoogleMapService } from './google-map/google-map.service';
import { GoogleMapModule } from './google-map/google-map.module';



@Module({
  imports: [UserModule, GoogleMapModule,ConfigModule.forRoot({isGlobal:true})],
  providers: [GoogleMapService],
})
export class AppModule {}
