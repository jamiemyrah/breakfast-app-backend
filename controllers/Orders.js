const { createConnection } = require('../database-utils/create-database')
const OrdersController = {
    async create(request, response){
        try{
            let connection = await createConnection();
        try{
            await connection.connect();
            let total = 0;
            for(let one of request.body.orderItems){
                total += (one.Price* one.quantity);
            }
            const result = await connection.query(`INSERT INTO orders (user_id, debt) VALUES(?,?)`, [
                request.body.user_id,
                total > 2000 ? total - 2000 : null
            ]);
            if(result){
                const orderId = result[0].insertId;
                for(let one of request.body.order){
                    await connection.query(`INSERT INTO orders (order_id,date,name,item,price,quantity,total,debt) VALUES(?,?,?,?,?,?,?,?)`, [
                        orderId,
                        one.date,
                        one.name,
                        one.item,
                        one.Price,
                        one.quantity,
                        one.total,
                        one.debt
                    ]);
                }
                return response.status(200).send({result});
            }
            return response.status(500).send({message: `UN EXPECTED ERROR OCCURRED`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }finally{
            await connection.end();
        }
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async updateById(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async deleteById(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async delete(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async findById(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async findOne(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async findAndCountAll(request, response){
        let connection = await createConnection();
        try{
            await connection.connect();
            let offset = 0;
            let limit = 100;
            if(request.query.offset){
                offset = +request.query.offset;
            }

            if(request.query.limit){
                limit = +request.query.limit;
            }

            let sql = `SELECT orders.*, order.order_id, order.order_Id AS referenced_id, order.date, order.name,order.item, order.price, order.quantity , order.total  order.debt FROM orders 
            LEFT JOIN Order ON  orders.order_id = order.order_id 
            LIMIT ${limit} OFFSET ${offset}`
            const ordersMap = {};
            const fetchResult = await connection.query(sql, []);
            if(Array.isArray(fetchResult[0]) && fetchResult[0].length){
                let count = 0;
                for(let one of fetchResult[0]){
                    if(!ordersMap[`${one.order_id}`]){
                        ordersMap[`${one.order_id}`] = {
                            order_id: one.order_id,
                            user_id: one.user_id,
                            order_date: one.order_date,
                            debt: one.debt,
                            order_item: []
                        }
                    }

                    if(one.order_id){
                        ordersMap[`${one.order_id}`].order.push({
                            order_id: one.order_id,
                            name: one.name,
                            item: one.item,
                            price: one.price,
                            quantity: one.quantity,
                            total: one.total,
                            debt: one.debt
                            
                        });
                    }
                }
            }
            const countResult = await connection.query(`SELECT COUNT('order_id') as count FROM orders`);
            return response.status(200).send({ orders: Object.values(ordersMap) , count: countResult[0][0].count });
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }finally{
            await connection.end();
        }
    },
    async deleteOne(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },

    async update(request, response){
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
        }
    },
};
module.exports = OrdersController;