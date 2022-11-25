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
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
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