const fs = require('fs');
const createConnection = require('../database-utils/connect-to-database');
module.exports = {
    async create(req, res, next) {
        try {
            const user = req.body;
            let sql = `INSERT INTO public."user" (`;
                sql +=  user.firstname ? `firstname,`: ''; 
                sql +=  user.lastname ? `lastname,`: ''; 
                sql +=  user.password ? `password,`: '';
                sql +=  user.username ? `username,`: '';
                sql +=  user.email ? `email,`: '';  
                sql +=  user.tel ? `tel,`: '';
                sql +=  user.dob ? `dob,`: '';
                sql +=  user.salary ? `salary`: ''; 
                sql +=  `)VALUES (`;            
                sql +=  user.firstname ? `'${user.firstname}',` : ""; 
                sql +=  user.lastname ? `'${user.lastname}',` : "";
                sql +=  user.password ? `'${user.password}',` : "";
                sql +=  user.username ? `'${user.username}',` : "";
                sql +=  user.email ? `'${user.email}',` : "";
                sql +=  user.tel ? `'${user.tel}',` : "";
                sql +=  user.dob ? `'${user.dob}',` : "";
                sql +=  user.salary ? `'${user.salary}'` : "";
                sql += `);`;  
            const connection = await createConnection();
            await connection.connect();
            await connection.query(sql);
            await connection.end();
            return res.status(201).send('User created successfully');         
        } catch (error) {
            
            console.log(error);
            //console.log(new Date());
            return res.status(500).send({ error });
        }
    },

    async getOne(req, res) {
        try {

        } catch (error) {

        }
    },

    async listAll(req, res) {
        try {

        } catch (error) {

        }
    },

    async delete(req, res) {
        try {

        } catch (error) {

        }
    },

    async update(req, res) {
        try {

        } catch (error) {

        }
    },

    async createTable(req, res, next){
        try{
            const { table } = req.body;
            let sql = `CREATE TABLE "public".${table.name} (`;
            for (let i=0;  i< table.columns.length; i++){
                sql += table.columns[i];
                if(i < table.columns.length-1){
                    sql += ",";
                }
            }
            sql += `);`;
            await client.query(sql);
            return res.status(200).send('Table users created successfully');
        }catch(error){
            console.log(error);
            return res.status(500).send({ error });
        }
    }
}