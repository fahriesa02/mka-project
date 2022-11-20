import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Products = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
  },
  skuProduct: {
    type: DataTypes.STRING,
  },
  quantityProduct: {
    type: DataTypes.INTEGER,
  },
  storeId: {
    type: DataTypes.INTEGER,
  },
}, {
  freezeTableName: true
});

// Products.sync();
// db.sync().then(() => {
//     console.log('Table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });
    
export default Products;