import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from 'src/modules/auth/applications/dtos/create-user.dto'
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from 'src/modules/auth/infra/persistence/repositories/ports/user-repository.port'

@Injectable()
export class CreateNewUserUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(data: CreateUserDto) {
    const userFound = await this.userRepositoryPort.findByEmail(data.email)

    if (userFound) throw new UnauthorizedException('User already exists')

    await this.userRepositoryPort.create(data)
  }
}
