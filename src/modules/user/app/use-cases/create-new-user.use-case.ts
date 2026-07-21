import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/modules/user/app/dtos/create-user.dto";
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from "src/modules/user/infra/persistence/repositories/ports/user-repository.port";
import {
  HashServicePort,
  HashServicePortToken,
} from "src/modules/user/infra/adapters/ports/hash-service-port";

@Injectable()
export class CreateNewUserUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepositoryPort: UserRepositoryPort,
    @Inject(HashServicePortToken)
    private readonly hashServicePort: HashServicePort,
  ) {}

  async execute(data: CreateUserDto) {
    const userFound = await this.userRepositoryPort.findByEmail(data.email);

    if (userFound) throw new UnauthorizedException("User already exists");

    const hash = await this.hashServicePort.hash(data.password);

    data.setHash(hash);

    await this.userRepositoryPort.create(data);
  }
}
