import { Module } from '@nestjs/common'
import { UserModule } from 'src/modules/auth/user.module'

@Module({
  imports: [UserModule],
})
export class ConfigModule {}
