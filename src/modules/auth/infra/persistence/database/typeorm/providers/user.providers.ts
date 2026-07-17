import { Users } from 'src/modules/auth/infra/persistence/database/typeorm/entity/Users'
import { DataSource } from 'typeorm'

export const userProviders = [
  {
    provide: 'USER_REPOSITORY-OF-EXEMPLE',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
]
