const fs = require('fs');
const executeQuery = require('../database-utils/execute-query');

module.exports = {
    async create(req, res, next) {
        try {
            const sql = `INSERT INTO products (name, category_id, quantity_in_stock, image_path) VALUES ('${req.body.name}','${req.body.categoryId}', ${req.body.quantityInStock} , ${req.body.imagePath ? "'"+req.body.imagePath+"'": null});`;
            const result =  await executeQuery(sql);
            return res.send(result);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    async createMany(req, res, next){
        try{         
            let sql = `INSERT INTO products (name, category_id, quantity_in_stock, image_path) VALUES `; 
            let counter = 0;
            for(let one of req.body){
                sql += `('${one.name}',${one.categoryId}, ${one.quantityInStock}, ${one.imagePath ? "'"+one.imagePath+"'": null})`
                counter ++;
                if(counter < req.body.length){
                    sql += `,`;
                }
            }
            sql +=`;`;
            const result = await executeQuery(sql);
            return res.send(result);
        
        }catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    async getOne(req, res) {
        try {
            const { id } = req.query;
            if(!id){
             return res.status(400).send('id is required');
            }
            const result = await executeQuery(`SELECT * FROM products WHERE id = ${+id}`)
            if(Array.isArray(result) && result.length){
                return res.status(200).send(result[0]);
            }
            return res.status(404).send(`product with id ${id} not found`);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    async getManyByIds(req, res){
        try{
            let {ids} = req.query;
            if(!ids){
                return res.status(400).send('ids is required');
               }
            ids = ids.split(",");
            ids = ids.map(id=>Number(id));

            const result = await executeQuery(`SELECT * FROM products WHERE id IN(${ids})`)
            if(Array.isArray(result) && result.length){
                return res.status(200).send(result);
            }

            return res.status(200).send("No product with provide ids");

        } catch (error) {
            return res.status(500).send({ error });
        }

    },

    async listAll(req, res) {
        try {
            //const sql = `SELECT categories.name as categoryName, products.*  FROM categories INNER JOIN products ON products.category_id = categories.id`;
            const sql = `SELECT products.*, categories.name as categoryName  FROM products LEFT JOIN categories ON products.category_id = categories.id`;
            const results = await executeQuery(sql);
            return res.status(200).send(results);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            if(!id){
             return res.status(400).send('id is required');
            }
            const sql = `DELETE FROM products WHERE id = ${+id};`;
            const result = await executeQuery(sql);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    async update(req, res) {
        try {
            const { id, name } = req.params;
            if(!id){
            return res.status(400).send('Id is required');
            }
        
            if(!name || !name.trim()){
                return res.status(400).send('name is required');
            }

            const exisitingproducts = await executeQuery(`SELECT * FROM products WHERE id = ${+id}`);
            if(Array.isArray(exisitingproducts) && exisitingproducts.length){
                const sql = `UPDATE products SET name = '${name.trim()}' WHERE id = ${+id};`;
                const result = await executeQuery(sql);
                return res.status(200).send(result);
            }

            return res.status(404).send(`product with id ${id} not found`);

        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    async createTable(req, res, next){
        try{
            const sql = `CREATE TABLE products ( 
                id int NOT NULL AUTO_INCREMENT,
                name varchar(25) NOT NULL,
                company  varchar(300),
                quantity_in_stock int NOT NULL,
                category_id int NOT NULL,
                PRIMARY KEY(id),
                FOREIGN KEY(category_id) REFERENCES categories(id)
                ON DELETE CASCADE
             );`;
            const results = await executeQuery(sql);
            return res.status(200).send('Table cretated successfully')
        }catch(error){
            return res.status(500).send({error})
        }
    }
}