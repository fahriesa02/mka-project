import express from 'express';
import { connection } from './config/db_config.js';

const app = express();

connection();

app.listen(3000, () => {
    console.log('listening on port 3000');
})