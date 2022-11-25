// import dependency - express, router (local file)
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/router.js';
import { connection } from './config/db_config.js';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import bodyParser from 'body-parser';

// panggil object dotenv
const env = dotenv.config().parsed;

// panggil object express ke variable app
const app = express();


// middleware section
app.use(express.json()); // middleware parse json
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true})); // middleware encoding url


// method http request response
app.use('/', router); 

app.use(errorHandler);



// koneksi ke mongoDB
connection();

// express listen port yg dipakai untuk aktifkan server
app.listen(env.APP_PORT, function() {
    console.log(`Server berjalan di port ${env.APP_PORT}`);
});