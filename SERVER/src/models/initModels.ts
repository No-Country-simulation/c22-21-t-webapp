import { sequelize } from "@config/connection";
import { User } from "./User";
import { OTP } from "./OTP";

// Inicializar modelos
User.initModel(sequelize);
OTP.initModel(sequelize);
