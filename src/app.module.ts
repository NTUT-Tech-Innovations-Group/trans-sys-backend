import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { routeService } from './RouteAPI/route.service';
import { routeModule } from './RouteAPI/route.module';



@Module({
  imports: [routeModule,ConfigModule.forRoot({isGlobal:true})],
  providers: [routeService],
})
export class AppModule {}
