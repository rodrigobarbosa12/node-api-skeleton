import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'

const { URL } = process.env

@Injectable()
export class AxiosService {
  logger = new Logger(AxiosService.name)
  httpService: HttpService
  url: string

  constructor() {
    this.httpService = new HttpService()
    this.url = URL
  }

  async get<T>(params: T, token: string) {
    return await this.httpService.axiosRef.get(`${this.url}/app`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
