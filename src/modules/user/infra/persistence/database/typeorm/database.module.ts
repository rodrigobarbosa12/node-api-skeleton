import { Module } from '@nestjs/common'
import { databaseProviders } from 'src/modules/user/infra/persistence/database/typeorm/database.providers'

@Module({
  providers: [databaseProviders.pg],
  exports: [databaseProviders.pg],
})
export class DatabaseModule {}
