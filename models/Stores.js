import { DataTypes } from "sequelize";
import db from "../config/db_config.js";


const Stores = db.define('stores', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  province: {
    type: DataTypes.STRING
  },
  postCode: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  industry: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM('pusat', 'cabang'),
    defaultValue: 'pusat'
  },
}, {
  freezeTableName: true,
});

export default Stores;