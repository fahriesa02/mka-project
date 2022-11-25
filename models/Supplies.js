import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Products from "./Products.js";
import Warehouses from "./Warehouses.js";

const Supplies = db.define('supplies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  productsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: 'id',
    },
  },
  expirationDate: {
    type: DataTypes.DATEONLY
  },
  unit: {
    type: DataTypes.STRING,
  },
  quantityProduct: {
    type: DataTypes.INTEGER,
  },
  warehousesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Warehouses,
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
});

export default Supplies;