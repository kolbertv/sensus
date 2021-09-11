const { Pool } = require("pg");

// подключение к базе данных и экспорт инстанса
const pool = new Pool({
  user: "postgres",
  password: "11111111",
  host: "localhost",
  port: 5432,
  database: "sensus",
});

module.exports = pool;
