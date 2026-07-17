import {
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { LoginUserDto } from 'src/modules/auth/applications/dtos/login-user.dto'
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from 'src/modules/auth/infra/persistence/repositories/ports/user-repository.port'
import { authConfig } from 'src/shared/security'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(data: LoginUserDto): Promise<string> {
    const { email, password } = data

    const user = await this.userRepositoryPort.findByEmail(email)
    if (!user) throw new NotAcceptableException('User not found')

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const paramsToken = { id: user.id, name: user.name, email: user.email }
    return jwt.sign(paramsToken, authConfig.secret, { expiresIn: '1d' })
  }
}
