import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import { ConfigModule } from 'src/shared/config/config.module'
import { useSwagger } from 'src/shared/swagger'

export async function configApp() {
  const app = await NestFactory.create(ConfigModule, {
    bufferLogs: true,
    cors: true,
  })

  useSwagger(app)

  app.use(cors())
  app.useGlobalPipes(new ValidationPipe())

  return app
}
