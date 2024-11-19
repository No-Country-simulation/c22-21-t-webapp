import { app } from "./app";
import { sequelize } from "@config/connection";
import { envs } from "@config/envs";
import "@models/initModels"

const PORT = envs.PORT || 3000;

const main = async () => {
  try {
    await sequelize.sync();
    console.log("DB connected");
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

main();
