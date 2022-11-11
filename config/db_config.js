import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const db = new Sequelize(env.DB_NAME, env.USER_DB, '', {
    host: env.HOST_SQL,
    dialect: env.DIALECT_DB,
});

export const connection = function() {
    try {
        db.authenticate();
        console.log('Connection to DB success');
    } catch(error) {
        console.log('Unable to connect to database: ', error);
    }
}

export default db;