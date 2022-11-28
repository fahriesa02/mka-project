import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // companyId: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  // },
  // companyName: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  // },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  // city: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  // },
}, {
  freezeTableName: true,
})


export default Users;