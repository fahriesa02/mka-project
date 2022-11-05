import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const User = db.define('User', {
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

await User.sync();

export default User;