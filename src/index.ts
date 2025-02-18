import express from 'express';
import { Express } from 'express';
import router from './routes/index';
import sequelize from './db/index';
import syncTables from './models/SyncModels';
import { Request } from "express";
import cors from "cors";
import { errorHandler } from './errors';
import swaggerDocs from './services/SwaggerConfig';

const app: Express = express();
const port = 3000;

app.use(cors({ origin: '*' }));

app.use(express.json());

swaggerDocs(app);

app.use(errorHandler);
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
