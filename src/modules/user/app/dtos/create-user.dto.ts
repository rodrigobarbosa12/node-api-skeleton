interface Props {
  name: string;
  email: string;
  password: string;
}

export class CreateUserDto {
  name: string;
  email: string;
  password: string;

  constructor(data: Props) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  setHash(hash: string) {
    this.password = hash;
  }
}
