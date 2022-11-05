import { DataTypes } from "sequelize";
import db from "../config/db_config.js";

const Product = db.define('Product', {
    productName: {
        type: DataTypes.STRING
    },
    pieceOfProduct: {
        type: DataTypes.NUMBER
    },
    imageProduct: {
        type: DataTypes.STRING
    },
    expiredDate: {
        type: DataTypes.DATEONLY
    },
    expiredStatus: {
        type: DataTypes.STRING
    },
    idProduct: {
        type: DataTypes.NUMBER
    },
    stockProduct: {
        type: DataTypes.NUMBER
    }
}, {
    freezeTableName: true
});

await Product.sync();
    
export default Product;