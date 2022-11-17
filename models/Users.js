import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const User = db.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('akun-pusat', 'akun-cabang'),
        defaultValue: 'akun-pusat'
    },
    stored: {
        type: DataTypes.INTEGER,
    }
}, {
    freezeTableName: true
});

// tambahkan association model sebelum atau sesudah sync
User.sync();


export default User;