const app = require('./app')
const sequelize = require('./config/connection.js');
require('./models')

const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.sync();
        console.log("DB connected");
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
        await sequelize.sync()
    } catch (error) {
        console.log(error)
    }
}

main();