import { Inject, Injectable, Logger } from '@nestjs/common'
import { Users } from 'src/infrastructure/database/typeorm/entity/Users'
import { AppBodyCreate } from 'src/infrastructure/dtos/app-body'
import { Repository } from 'typeorm'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(
    @Inject('USER_REPOSITORY-OF-EXEMPLE')
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find()
  }

  async create(data: AppBodyCreate): Promise<void> {
    this.logger.log(data)

    await this.userRepository.save(data)
  }
}
