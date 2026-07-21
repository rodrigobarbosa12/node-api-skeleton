interface Props {
  email: string
  password: string
}

export class LoginUserDto {
  email: string
  password: string

  constructor(data: Props) {
    this.email = data.email
    this.password = data.password
  }
}
