import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateForm {
  @ApiProperty({
    example: 'Fabricio da Silva',
    description: "user's first and last name",
  })
  @Length(0, 100)
  name: string

  @ApiProperty({
    example: 'fabricio@email.com',
    description: "user's email",
  })
  @IsNotEmpty({
    message: 'E-mail é obrigatório',
  })
  @Length(0, 80)
  email: string

  @ApiProperty({
    example: '123456',
    description: 'user password',
  })
  @IsNotEmpty({
    message: 'Senha é obrigatória',
  })
  @Length(0, 120)
  password: string
}
