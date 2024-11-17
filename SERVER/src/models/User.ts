import { DataTypes } from "sequelize";
import { sequelize } from "@config/connection";

export const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

// User.prototype.toJSON = function () {
//     const values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// }
