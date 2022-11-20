import db from "../config/db_config.js";
import { DataTypes } from "sequelize";
import Stores from "./Stores.js";

const Warehouses = db.define('warehouses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  storeId: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

// Warehouses.belongsTo(Stores, {
//     foreignKey: 'store_id'
// })
// Warehouses.sync();

export default Warehouses;