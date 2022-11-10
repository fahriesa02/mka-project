import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Product = db.define('Product', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pieceOfProduct: {
        type: DataTypes.INTEGER,
    },
    imageProduct: {
        type: DataTypes.STRING,
    },
    expiredDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expiredStatus: {
        type: DataTypes.ENUM('EXPIRED', 'NOT_EXPIRED'),
        defaultValue: 'NOT_EXPIRED'
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
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