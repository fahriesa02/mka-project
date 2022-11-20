import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
// import Stores from "./Stores.js";

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
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // city: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  // },
}, {
  freezeTableName: true,
});

// association table by foreign key
// Users.belongsTo(Stores, {
//     foreignKey: 'store_id'
// });
// Users.sync();


export default Users;