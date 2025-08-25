import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/typeorm/database.module'
import { userProviders } from 'src/infrastructure/database/typeorm/providers/user.providers'
import { AppService } from '../../applications/app/app.service'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
  imports: [DatabaseModule],
  providers: [...userProviders, AppService],
})
export class AppModule {}
