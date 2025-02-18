import express from 'express';
import { Express } from 'express';
import router from './routes/index';
import sequelize from './db/index';
import syncTables from './models/SyncModels';
import { Request } from "express";
import cors from "cors";
import { ErrorHandler } from './middlewares/ErrorHandler';
import swaggerDocs from './services/SwaggerConfig';
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' }));

app.use(express.json());

swaggerDocs(app);

app.use(ErrorHandler);
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost${port}`);
});

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await syncTables();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

db();
