import Users from "./Users.js";
import Warehouses from "./Warehouses.js";
import Stores from "./Stores.js";
import Supplies from "./Supplies.js";
import Products from "./Products.js";
import StoreUsers from "./StoreUsers.js";
import ProductManagement from "./ProductManagement.js";

await Stores.sync();
await Users.sync();
await StoreUsers.sync();
await Products.sync();
await Warehouses.sync();
await Supplies.sync();
await ProductManagement.sync();

Stores.hasMany(Warehouses, { foreignKey: 'storeId' });
Stores.hasMany(Products, { foreignKey: 'storeId' });
Stores.hasMany(ProductManagement, { foreignKey: 'storeId' });
Products.hasMany(ProductManagement, { foreignKey: 'productId' });
Warehouses.hasMany(Supplies, { foreignKey: 'warehouseId' });
Supplies.hasMany(Products, { foreignKey: 'productId' });
Supplies.hasMany(ProductManagement, { foreignKey: 'suppliesId' });

Stores.belongsToMany(Users, { through: StoreUsers });
Users.belongsToMany(Stores, { through: StoreUsers });

export default { Users, Warehouses, Products, Supplies, Stores, StoreUsers };