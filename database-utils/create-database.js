const mysql2 = require('mysql2/promise');
const p = {};

const createConnection = async(createDateBase = false) => {
    try{
        const connection = await mysql2.createConnection({
            host: process.env.host,
            port: Number(process.env.dbport),
            ...(createDateBase===false && { database: process.env.database}),
            user: process.env.user,
            password: process.env.password
        });
        return connection;
    }catch(error){
        console.log(error)
    }
};


const createDatabaseIfNotExists = async() => {
    let connection
    try{
        connection = await createConnection(true);
        let result = await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`);
        if(Array.isArray(result) && result.length){
            if(result[0].affectedRows > 0){
                await connection.end();
                connection = await createConnection();
                await connection.query(`CREATE TABLE breakfast (
                    user_id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    userType ENUM('Normal','Admin','SuperAdmin') DEFAULT 'Normal',
                    company VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    status ENUM('Active','Inactive') DEFAULT 'Active',
                    JoiningDate date DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (user_id)
                );`);

                await connection.query(`CREATE TABLE order_item (
                    order_id INT NOT NULL AUTO_INCREMENT,
                    user_id INT NOT NULL,
                    order_date date DEFAULT CURRENT_TIMESTAMP,
                    debt FLOAT,
                    PRIMARY KEY (order_id),
                    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
                );`);

                await connection.query(`CREATE TABLE orders (
                    order_id INT NOT NULL AUTO_INCREMENT,
                    order_id INT NOT NULL,
                    order_date date DEFAULT CURRENT_TIMESTAMP,
                    name VARCHAR(255) NOT NULL,
                    item VARCHAR(255) NOT NULL,
                    price FLOAT NOT NULL,
                    quantity FLOAT NOT NULL,
                    total FLOAT NOT NULL,
                    debt FLOAT NOT NULL,
                    PRIMARY KEY (order_id),
                    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
                );`);
            }
        }
        await connection.connect();
    } catch(error){
        console.log(error)
    }finally{
        await connection.end();
    }
 };


module.exports = {
    createConnection,
    createDatabaseIfNotExists
}
