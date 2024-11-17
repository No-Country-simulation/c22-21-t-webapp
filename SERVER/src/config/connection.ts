import { Sequelize } from "sequelize";
import { envs } from "./envs";

export const sequelize = new Sequelize(envs.DB_NAME, envs.DB_USER, envs.DB_PASSWORD, {
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  dialect: "postgres",
  logging: false,
});
