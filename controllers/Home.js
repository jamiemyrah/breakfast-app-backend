const fs = require("fs");
const executeQuery = require("../database-utils/execute-query");

module.exports = {
  async create(req, res, next) {
    try {
      const sql = `INSERT INTO categories (name, image_path) VALUES ('${
        req.body.name
      }', ${req.body.imagePath ? "'" + req.body.imagePath + "'" : null});`;
      const result = await executeQuery(sql);
      return res.send(result);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async createMany(req, res, next) {
    try {
      let sql = `INSERT INTO categories (name, image_path) VALUES`;
      let counter = 0;
      for (let one of req.body) {
        sql += `('${one.name}', ${
          one.imagePath ? "'" + one.imagePath + "'" : null
        })`;
        counter++;
        if (counter < req.body.length) {
          sql += `,`;
        }
      }
      sql += `;`;
      const result = await executeQuery(sql);
      return res.send(result);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).send("id is required");
      }
      const result = await executeQuery(
        `SELECT * FROM categories WHERE id = ${+id}`
      );
      if (Array.isArray(result) && result.length) {
        return res.status(200).send(result[0]);
      }
      return res.status(404).send(`category with id ${id} not found`);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async getManyByIds(req, res) {
    try {
      let { ids } = req.query;
      if (!ids) {
        return res.status(400).send("ids is required");
      }
      ids = ids.split(",");
      ids = ids.map((id) => Number(id));

      const result = await executeQuery(
        `SELECT * FROM categories WHERE id IN(${ids})`
      );
      if (Array.isArray(result) && result.length) {
        return res.status(200).send(result);
      }

      return res.status(200).send("No category with provide ids");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async listAll(req, res) {
    try {
      let { offset, limit } = req.query;
      if(!offset){
        offset = 0;
      }

      if(!limit){
        limit = 4;
      }

      const sql = `SELECT * FROM categories LIMIT ${+limit} OFFSET ${+offset}`;
      const results = await executeQuery(sql);
      const countSQL = `SELECT COUNT(name) as count FROM categories`
      const countResults = await executeQuery(countSQL);
      console.log(countResults);
      return res.status(200).send({
        categories: results,
        count: countResults[0].count
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send("id is required");
      }
      const sql = `DELETE FROM categories WHERE id = ${+id};`;
      const result = await executeQuery(sql);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async update(req, res) {
    try {
      const { id, name } = req.params;
      if (!id) {
        return res.status(400).send("Id is required");
      }

      if (!name || !name.trim()) {
        return res.status(400).send("name is required");
      }

      const exisitingCategories = await executeQuery(
        `SELECT * FROM categories WHERE id = ${+id}`
      );
      if (Array.isArray(exisitingCategories) && exisitingCategories.length) {
        const sql = `UPDATE categories SET name = '${name.trim()}' WHERE id = ${+id};`;
        const result = await executeQuery(sql);
        return res.status(200).send(result);
      }

      return res.status(404).send(`category with id ${id} not found`);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  async createTable(req, res, next) {
    try {
      const sql = `CREATE TABLE categories ( 
                id int NOT NULL AUTO_INCREMENT,
                name varchar(25) NOT NULL,
                company varchar(300),
                PRIMARY KEY(id)
             );`;
      const results = await executeQuery(sql);

      return res.status(200).send("Table cretated successfully");
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};