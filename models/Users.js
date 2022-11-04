import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Users = db.define('Users', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('akun-pusat', 'akun-cabang'),
        defaultValue: 'akun-pusat'
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Users;