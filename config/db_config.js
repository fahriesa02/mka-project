// import sequelize untuk koneksi ke database
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// panggil dotenv
const env = dotenv.config().parsed;

const db = new Sequelize(env.DB_NAME, env.USER_DB, env.PASSWORD_DB, {
  host: env.HOST_SQL,
  dialect: env.DIALECT_DB,
});

export const connection = function() {
  try {
    db.authenticate();
    console.log('CONNECTION TO DB SUCCESS');
  } catch (error) {
    console.log('UNABLE TO CONNECT TO DATABASE: ', error);
  }
};

export default db;