import { Module } from '@nestjs/common'
import { databaseProviders } from 'src/modules/auth/infra/persistence/database/typeorm/database.providers'

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
