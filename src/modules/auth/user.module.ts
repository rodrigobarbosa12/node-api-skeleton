import { Module } from '@nestjs/common'
import { CreateNewUserUseCase } from 'src/modules/auth/applications/use-cases/create-new-user.use-case'
import { ListAllUsersUseCase } from 'src/modules/auth/applications/use-cases/list-all-users.use-case'
import { LoginUseCase } from 'src/modules/auth/applications/use-cases/login.use-case'
import { DatabaseModule } from 'src/modules/auth/infra/persistence/database/typeorm/database.module'
import { userProviders } from 'src/modules/auth/infra/persistence/database/typeorm/providers/user.providers'
import { UserRepositoryPortToken } from 'src/modules/auth/infra/persistence/repositories/ports/user-repository.port'
import { UserRepository } from 'src/modules/auth/infra/persistence/repositories/user.repository'
import { UserController } from 'src/modules/auth/interfaces/api/user.controller'

@Module({
  controllers: [UserController],
  providers: [
    // DB
    ...userProviders,

    // Providers
    {
      provide: UserRepositoryPortToken,
      useClass: UserRepository,
    },

    // Use cases
    CreateNewUserUseCase,
    ListAllUsersUseCase,
    LoginUseCase,
  ],
  imports: [DatabaseModule],
})
export class UserModule {}
