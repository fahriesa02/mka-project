import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Product = db.define('Product', {
    productName: {
        type: DataTypes.STRING,
    },
    pieceOfProduct: {
        type: DataTypes.INTEGER,
    },
    imageProduct: {
        type: DataTypes.STRING,
    },
    expiredDate: {
        type: DataTypes.DATE,
    },
    expiredStatus: {
        type: DataTypes.STRING,
    },
    idProduct: {
        type: DataTypes.INTEGER,
    },
    stockProduct: {
        type: DataTypes.INTEGER,
    }
}, {
    freezeTableName: true
});

Product.sync();
// db.sync().then(() => {
//     console.log('Table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });
    
export default Product;