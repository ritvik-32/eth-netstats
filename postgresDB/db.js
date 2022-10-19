const { Pool } = require("pg");

const pool = new Pool({
  user: "dev",
  database: "stats",
  password: "dev@123",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };