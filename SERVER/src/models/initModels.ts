import { sequelize } from "@config/connection";
import { User } from "./User";

User.initModel(sequelize);