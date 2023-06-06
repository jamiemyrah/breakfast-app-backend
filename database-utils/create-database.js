const mysql2 = require("mysql2/promise");
let connection;

const createDatabase = async (dbName) => {
  try {
    connection = await mysql2.createConnection({
      port: Number(process.env.mysqlport),
      host: process.env.mysqlhost,
      user: process.env.user,
      password: process.env.password,
    });
    await connection.connect();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = createDatabase;