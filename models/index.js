import Users from "./Users.js";
import Warehouses from "./Warehouses.js";
import Stores from "./Stores.js";
import Supplies from "./Supplies.js";
import Products from "./Products.js";
import StoreUsers from "./StoreUsers.js";

// console.log(Stores);
// Users.hasMany(StoreUsers, {
//     foreignKey: 'user_id'
// })

// StoreUsers.belongsTo(Stores, {
//     foreignKey: 'store_id'
// })

// Stores.hasMany(StoreUsers, {
//     foreignKey: 'store_id'
// })

// Users.belongsTo(StoreUsers, {
//     foreignKey: 'user_id'
// })

await Users.sync();
await Stores.sync();
await StoreUsers.sync();
await Products.sync();
await Warehouses.sync();
await Supplies.sync();

Stores.hasMany(Warehouses,    { foreignKey: 'storeId' });
Warehouses.hasMany(Supplies,  { foreignKey: 'warehouseId' });
Supplies.hasMany(Products,    { foreignKey: 'productId' });
Stores.hasMany(Products,      { foreignKey: 'storeId' });

Stores.belongsToMany(Users, { through: StoreUsers });
Users.belongsToMany(Stores, { through: StoreUsers });

// Stores.belongsTo(Warehouses, {
//     foreignKey: 'storeId'
// })

// Warehouses.hasMany(Supplies, {
//     foreignKey: 'warehouseId'
// })

// const x = Users.create({
//     email: 'fujinkai@gmail.com',
//     password: 'warlock'
// })
// console.log(x);
// console.log(Users.findAll());

export default { Users, Warehouses, Products, Supplies, Stores, StoreUsers };

// table stores : id
// id = 1, email = alakadut@gmail.com, name = alakadut, type = pusat
// id = 2, email = alakadut-cabang@gmail.com, name = alakadut-cabang, type = cabang


// table users: 
// id = 1, email = alakadut@gmail.com
// id = 2, email = admin1@gmail.com
// id = 3, email = admin2@gmail.com
// id = 4, email = manager1@gmail.com

// table stores_users
// id = 1, store_id = 1, users_id = 1, role = owner
// id = 2, store_id = 2, users_id = 1, role = owner
// id = 3, store_id = 2, users_id = 2, role = staff
// id = 4, store_id = 1, users_id = 3, role = staff
// id = 5, store_id = 1, users_id = 4, role = staff
// id = 6, store_id = 2, users_id = 4, role = owner

// table warehouse:
// id = 1, store_id = 1, name = warehouse-pusat
// id = 2, store_id = 2, name = warehouse-cabang
// id = 3, store_id = 1, name = warehouse-pusat

// table supplies:
// id = 1, product_id = 1, expiration_date = 2024-10-02, warehouse_id = 1
// id = 2, product_id = 2, expiration_date = 2023-08-01, warehouse_id = 1
// id = 3, product_id = 3, expiration_date = 2023-08-07, warehouse_id = 1
// id = 4, product_id = 4, expiration_date = 2023-06-09, warehouse_id = 2
// id = 5, product_id = 5, expiration_date = 2023-09-12, warehouse_id = 2
// id = 6, product_id = 1, expiration_date = 2025-10-02, warehouse_id = 2

// table products:
// id = 1, name = Indomie Goreng, image = indomie.jpg
// id = 2, name = Pop Mie Goreng, image = popmiegoreng.jpg
// id = 3, name = Kapal Api, image = kapalapi.jpg
// id = 4, name = Good Day Cappucino, image = gooddaycappucino.jpg
// id = 5, name = Paseo Tissue, image = paseotissue.jpg