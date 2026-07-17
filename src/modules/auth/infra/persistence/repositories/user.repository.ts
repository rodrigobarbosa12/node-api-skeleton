import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/modules/auth/applications/dtos/create-user.dto'
import { Users } from 'src/modules/auth/infra/persistence/database/typeorm/entity/Users'
import { UserRepositoryPort } from 'src/modules/auth/infra/persistence/repositories/ports/user-repository.port'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @Inject('USER_REPOSITORY-OF-EXEMPLE')
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(data: CreateUserDto): Promise<void> {
    await this.userRepository.save(data)
  }

  async findByEmail(email: string): Promise<Users | null> {
    const userFound = await this.userRepository.findOneBy({ email })
    return userFound ?? null
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find()
  }
}
