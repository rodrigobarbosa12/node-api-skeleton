import { Module } from "@nestjs/common";
import { CreateNewUserUseCase } from "src/modules/user/app/use-cases/create-new-user.use-case";
import { ListAllUsersUseCase } from "src/modules/user/app/use-cases/list-all-users.use-case";
import { LoginUseCase } from "src/modules/user/app/use-cases/login.use-case";
import { DatabaseModule } from "src/modules/user/infra/persistence/database/typeorm/database.module";
import { userProviders } from "src/modules/user/infra/persistence/database/typeorm/providers/user.providers";
import { UserRepositoryPortToken } from "src/modules/user/infra/persistence/repositories/ports/user-repository.port";
import { UserRepository } from "src/modules/user/infra/persistence/repositories/user.repository";
import { UserController } from "src/modules/user/interfaces/api/user.controller";
import { BcryptAdapter } from "src/modules/user/infra/adapters/bcrypt-adapter.adapter";
import { HashServicePortToken } from "src/modules/user/infra/adapters/ports/hash-service-port";

@Module({
  controllers: [UserController],
  providers: [
    // Schemas DB
    userProviders.user,

    // Providers
    {
      provide: UserRepositoryPortToken,
      useClass: UserRepository,
    },
    {
      provide: HashServicePortToken,
      useClass: BcryptAdapter,
    },

    // Use cases
    CreateNewUserUseCase,
    ListAllUsersUseCase,
    LoginUseCase,
  ],
  imports: [DatabaseModule],
})
export class UserModule {}
