import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtPayload } from 'jsonwebtoken'
import * as moment from 'moment'
import { ExceptionError, getPayload } from '../utils'

@Injectable()
export class Middleware implements CanActivate {
  logger = new Logger(Middleware.name)

  constructor(private reflector: Reflector) {}

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

    // Bearer lkasdjfksdfaDJKÇLÇLKASDA
    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      throw ExceptionError('Token error', 401)
    }

    const [schema, token] = parts

    // Verifica se Schema tem a palavra Bearer
    if (!/^Bearer$/i.test(schema)) {
      throw ExceptionError('Token mal formado', 401)
    }

    const payload = getPayload(token) as JwtPayload

    if (!payload?.exp) {
      throw ExceptionError('Token inválido', 401)
    }

    if (moment() > moment.unix(payload?.exp)) {
      throw ExceptionError('Sessão expirada', 401)
    }

    request.user = payload.user

    return true
  }
}
