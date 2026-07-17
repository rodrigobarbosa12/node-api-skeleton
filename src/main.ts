import 'dotenv/config'
import { configApp } from 'src/shared/config/server-config'

async function bootstrap() {
  const { PORT_SERVER } = process.env

  const app = await configApp()

  await app.listen(PORT_SERVER, '0.0.0.0', () => {
    console.log(`Server running in: http://0.0.0.0:${PORT_SERVER}`)
  })
}

bootstrap()
