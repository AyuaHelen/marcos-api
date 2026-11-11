require('dotenv').config({ path: `${process.cwd()}/.env` });

const base = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
};

module.exports = {
  development: { ...base },
  test: { ...base },
  production: { ...base },
};
