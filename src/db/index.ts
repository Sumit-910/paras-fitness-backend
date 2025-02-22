import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Creating a new Sequelize instance and connecting to the MySQL database
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || '', // Database name
    process.env.MYSQL_NAME || '', // Database username
    process.env.MYSQL_PASSWORD, { // Database password
    host: process.env.MYSQL_HOST || '127.0.0.1', // Database host
    dialect: 'mysql' // Defining the SQL dialect as MySQL
  });

export default sequelize;
