import { Module } from '@nestjs/common'
import { AppModule } from 'src/interfaces/app/app.module'

@Module({
  imports: [AppModule],
})
export class ConfigModule {}
