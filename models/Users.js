import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const User = db.define('User', {
    idToko: {
        type: DataTypes.STRING
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // userName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
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