import { Sequelize } from "sequelize";
import { envs } from "./envs";

export const sequelize = new Sequelize(envs.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});
