import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "src/modules/user/app/dtos/user.dto";
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from "src/modules/user/infra/persistence/repositories/ports/user-repository.port";

@Injectable()
export class ListAllUsersUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(): Promise<UserDto[]> {
    const usersSchema = await this.userRepositoryPort.findAll();

    return usersSchema.map(
      (user) =>
        new UserDto({
          name: user.name,
          email: user.email,
          active: user.active,
        }),
    );
  }
}
