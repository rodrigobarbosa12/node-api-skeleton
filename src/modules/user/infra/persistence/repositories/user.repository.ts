import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/modules/user/app/dtos/create-user.dto";
import { UserSchema } from "src/modules/user/infra/persistence/database/typeorm/schemas/Users.schema";
import { UserRepositoryPort } from "src/modules/user/infra/persistence/repositories/ports/user-repository.port";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @Inject("USER_REPOSITORY-OF-EXEMPLE")
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async create(data: CreateUserDto): Promise<void> {
    await this.userRepository.save(data);
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    const userFound = await this.userRepository.findOneBy({ email });
    return userFound ?? null;
  }

  async findAll(): Promise<UserSchema[]> {
    return await this.userRepository.find();
  }
}
