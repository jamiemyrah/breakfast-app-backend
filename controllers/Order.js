const OrderController = {
    async create(request, response){
        try{
            return response.status(200).send({message: `request received`});
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
        try{
            return response.status(200).send({message: `request received`});
        }catch(error){
            console.log(error);
            return response.status(500).send({error})
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
module.exports = OrderController;