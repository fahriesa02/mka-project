import express from 'express';
import { connection } from './config/db_config.js';
import dotenv from 'dotenv';
import router from './routes/router.js';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import bodyParser from 'body-parser';

const app = express();
const env = dotenv.config().parsed;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', router);

// app.use((req, res) => {
//     return res.status(404).json({
//         message: '404_NOT_FOUND'
//     });
// });
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

connection();

app.listen(env.APP_PORT, () => {
  console.log(`Listening on port ${env.APP_PORT}`);
})