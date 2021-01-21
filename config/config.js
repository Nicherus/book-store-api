const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    "dialect": "postgres"
  },
  test: {
    url: process.env.DATABASE_URL,
    "dialect": "postgres"
  },
};