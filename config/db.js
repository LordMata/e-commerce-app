const pgPromise = require('pg-promise')();
require('dotenv').config();

const db = pgPromise({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
