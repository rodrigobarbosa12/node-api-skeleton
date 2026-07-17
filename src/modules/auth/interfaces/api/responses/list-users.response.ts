import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponseDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Rodrigo Barbosa',
    type: String,
  })
  @Expose()
  name: string

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'rodrigo@email.com',
    type: String,
    format: 'email',
  })
  @Expose()
  email: string

  @ApiProperty({
    description: 'Indica se o usuário está ativo',
    example: true,
    type: Boolean,
  })
  @Expose()
  active: boolean
}
