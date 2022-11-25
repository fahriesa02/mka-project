import db from '../config/db_config.js';
import { DataTypes } from 'sequelize';
import Stores from './Stores.js';
import Products from './Products.js';
import Supplies from './Supplies.js';
import Warehouses from './Warehouses.js';

const ProductManagement = db.define('product_management', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  storeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Stores,
      key: 'id',
    },
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Warehouses,
      key: 'id',
    },
  },
  suppliesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Supplies,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: 'id',
    },
  },
  statusProduct: {
    type: DataTypes.ENUM('tersedia', 'hampir-habis', 'expired', 'habis'),
    defaultValue: 'tersedia',
  }
});

export default ProductManagement;