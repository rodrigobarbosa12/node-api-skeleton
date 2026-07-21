import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { LoginUserDto } from "src/modules/user/app/dtos/login-user.dto";
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from "src/modules/user/infra/persistence/repositories/ports/user-repository.port";
import { authConfig } from "src/shared/security";
import {
  HashServicePort,
  HashServicePortToken,
} from "src/modules/user/infra/adapters/ports/hash-service-port";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepositoryPort: UserRepositoryPort,
    @Inject(HashServicePortToken)
    private readonly hashServicePort: HashServicePort,
  ) {}

  async execute(data: LoginUserDto): Promise<string> {
    const { email, password } = data;

    const userFound = await this.userRepositoryPort.findByEmail(email);
    if (!userFound) throw new NotAcceptableException("User not found");

    const match = await this.hashServicePort.compare(
      password,
      userFound.password,
    );

    if (!match) throw new ConflictException("Invalid credentials");

    const paramsToken = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };
    return jwt.sign(paramsToken, authConfig.secret, { expiresIn: "1d" });
  }
}
