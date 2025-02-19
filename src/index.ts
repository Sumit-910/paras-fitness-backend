// Importing required modules and packages
import express, { Express, Request } from 'express';
import router from './routes/index'; 
import sequelize from './db/index'; 
import syncTables from './models/SyncModels'; 
import cors from "cors";
import swaggerDocs from './services/SwaggerConfig'; 
import dotenv from "dotenv";
import { ErrorHandler } from './middlewares/ErrorHandler';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app: Express = express();

// Set the port number from environment variables
const port = process.env.PORT;

// Enable CORS to allow cross-origin requests from any domain
app.use(cors({ origin: '*' }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize Swagger API documentation
swaggerDocs(app);

// Global error-handling middleware (must be after routes for proper handling)
app.use(ErrorHandler);

// Use the main router to manage different endpoints
app.use('/', router);

// Start the Express server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Function to establish a database connection and synchronize tables
const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await syncTables();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Initialize database connection
db();
