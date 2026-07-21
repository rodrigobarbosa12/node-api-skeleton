import { UserSchema } from "src/modules/user/infra/persistence/database/typeorm/schemas/Users.schema";
import { DataSource } from "typeorm";

export const userProviders = {
  user: {
    provide: "USER_REPOSITORY-OF-EXEMPLE",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserSchema),
    inject: ["DATA_SOURCE"],
  },
};
