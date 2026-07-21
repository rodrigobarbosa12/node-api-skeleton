import * as bcrypt from "bcryptjs";
import { HashServicePort } from "src/modules/user/infra/adapters/ports/hash-service-port";

export class BcryptAdapter implements HashServicePort {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
