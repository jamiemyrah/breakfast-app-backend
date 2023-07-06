const createConnection = require('./connect-to-database');
module.exports = async function executeQuery(sql){
    try{
        const connection = await createConnection();
        await connection.connect();
        const results = await connection.query(sql);
        await connection.end();
        return results[0];
    } catch(error){
        console.log(error);
    }
    
}