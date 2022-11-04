import express from 'express';
import { connection } from './config/db_config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use((req, res) => {
    return res.status(404).json({
        message: '404_NOT_FOUND'
    });
});


connection();

app.listen(3000, () => {
    console.log('listening on port 3000');
})