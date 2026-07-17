interface Props {
  name: string
  email: string
  active: '0' | '1'
}

export class UserDto {
  name: string
  email: string
  active: boolean

  constructor(data: Props) {
    this.name = data.name
    this.email = data.email
    this.active = data.active === '1'
  }
}
