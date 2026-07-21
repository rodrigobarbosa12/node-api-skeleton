import { CreateUserDto } from "src/modules/user/app/dtos/create-user.dto";
import { UserSchema } from "src/modules/user/infra/persistence/database/typeorm/schemas/Users.schema";

export interface UserRepositoryPort {
  create(data: CreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<UserSchema | null>;
  findAll(): Promise<UserSchema[]>;
}

export const UserRepositoryPortToken = Symbol("UserRepositoryPort");
