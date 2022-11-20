import db from "../config/db_config.js";
import { DataTypes } from "sequelize";

const Supplies = db.define('supplies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  productsId: {
    type: DataTypes.INTEGER
  },
  expirationDate: {
    type: DataTypes.DATEONLY
  },
  warehousesId: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});

// Supplies.sync();

export default Supplies;