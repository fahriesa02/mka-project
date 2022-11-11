import { Sequelize } from "sequelize";

const db = new Sequelize('db_logitory', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
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