const mysql = require('mysql2/promise');
module.exports = async () => {
    console.log("user", process.env.user)
    let connection = mysql.createConnection({
        port: Number(process.env.mysqlport),
        host: process.env.mysqlhost,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    });
    return connection;
}