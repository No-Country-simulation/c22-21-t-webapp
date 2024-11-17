import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  // DB_URL: string;
  // TOKEN_SECRET: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  DB_PORT: envVars.DB_PORT,
  DB_NAME: envVars.DB_NAME,
  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_HOST: envVars.DB_HOST,
};
