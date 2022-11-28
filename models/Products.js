import { DataTypes } from "sequelize";
import db from "../config/db_config.js";
import Stores from "./Stores.js";

const Products = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.BLOB,
  },
  skuProduct: {
    type: DataTypes.STRING,
  },
  storeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Stores,
      key: 'id'
    }
  },
}, {
  freezeTableName: true,
});

export default Products;