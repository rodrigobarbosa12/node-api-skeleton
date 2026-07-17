import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { fromUnixTime, isAfter } from 'date-fns'
import { JwtPayload } from 'jsonwebtoken'
import { ExceptionError, getPayload } from 'src/shared/utils'

@Injectable()
export class AuthGuard implements CanActivate {
  logger = new Logger(AuthGuard.name)

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const authorization = request.headers['authorization']

    if (!authorization) {
      throw ExceptionError('Token error', 401)
    }

    // Bearer <token>
    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      throw ExceptionError('Token error', 401)
    }

    const [schema, token] = parts

    if (!/^Bearer$/i.test(schema)) {
      throw ExceptionError('Token mal formado', 401)
    }

    const payload = getPayload(token) as JwtPayload

    if (!payload?.payload?.exp) {
      throw ExceptionError('Token inválido', 401)
    }

    const expirationDate = fromUnixTime(payload.payload.exp)

    if (isAfter(new Date(), expirationDate)) {
      throw ExceptionError('Sessão expirada', 401)
    }

    request.user = payload.user

    return true
  }
}
