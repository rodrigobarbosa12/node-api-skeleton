import { CreateUserDto } from 'src/modules/auth/applications/dtos/create-user.dto'
import { Users } from 'src/modules/auth/infra/persistence/database/typeorm/entity/Users'

export interface UserRepositoryPort {
  create(data: CreateUserDto): Promise<void>
  findByEmail(email: string): Promise<Users | null>
  findAll(): Promise<Users[]>
}

export const UserRepositoryPortToken = Symbol('UserRepositoryPort')
