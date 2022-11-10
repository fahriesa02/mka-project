import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const User = db.define('User', {
    idToko: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.ENUM('akun-pusat', 'akun-cabang'),
        defaultValue: 'akun-pusat'
    }
}, {
    freezeTableName: true
});

User.sync();


export default User;