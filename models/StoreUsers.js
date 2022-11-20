import { DataTypes } from 'sequelize';
import db from '../config/db_config.js';
import Stores from './Stores.js';
import Users from './Users.js';

const StoreUsers = db.define('store_users', {
  // id: {
  //     type: DataTypes.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //     allowNull: false,
  // },
  storeId: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: {
      model: Stores,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('owner', 'staff'),
    defaultValue: 'staff',
  },
});

// StoreUsers.sync();

export default StoreUsers;