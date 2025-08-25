import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AppService } from 'src/applications/app/app.service'
import { Users } from 'src/infrastructure/database/typeorm/entity/Users'
import { Public } from 'src/infrastructure/decorators/public-route'
import { AppBodyCreate } from 'src/infrastructure/dtos/app-body'
import { Middleware } from 'src/infrastructure/guards/Middleware'

@Controller('/app')
@UseGuards(Middleware)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() body: AppBodyCreate): Promise<void> {
    await this.appService.create(body)
  }

  @Get('/find-all')
  @Public()
  @ApiBearerAuth()
  async findAll(): Promise<Users[]> {
    return await this.appService.findAll()
  }
}
