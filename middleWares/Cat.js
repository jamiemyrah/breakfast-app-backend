const executeQuery = require("../database-utils/execute-query");

module.exports = {

    validateName(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let data of req.body) {
                const result = checkNameValidity(res, data);
                if (result) {
                    return res.status(400).send(result);
                }
            }
        } else {
            const result = checkNameValidity(res, req.body);
            if (result) {
                return res.status(400).send(result);
            }
        }

        next();
    },
    
    validateId(req, res, next) {

        if (!req.body.id) {
            return res.send('data id is required');
        }
        next();
    },

    makesureProductIsProvidedInTheBody(req, res, next) {

        if (!req.body) {
            return res.send('No data provided')
        }
        next();
    },

    async checkForDuplicates(req, res, next) {
        const exisitingProducts = await executeQuery('SELECT name FROM products');
        if (Array.isArray(exisitingProducts)) {
            if (Array.isArray(req.body)) {

                for (let requestproduct of req.body) {
                    const result = checkForSpecificDuplicate(res, exisitingProducts, requestproduct);
                    if (result) {
                        return res.status(400).send(result);
                    }
                }

            } else {
                const result = checkForSpecificDuplicate(res, exisitingProducts, req.body);
                if (result) {
                    return res.status(400).send(result);
                }
            }
        }
        next();
    },

    capitalizeNames(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let product of req.body) {
                capitalizeNamesForSpecificData(product);
            }
        } else {
            capitalizeNamesForSpecificData(req.body);
        }
        next();
    }

};

function checkNameValidity(res, data) {
    if (!data.company || !data.name || data.email|| !data.userType || !data.joiningDate|| !data.name.trim()) {
        return 'product name is required';
    }

    return null;
}

function checkForSpecificDuplicate(res, data, reqData) {
    const productsWithSaneName =
        products.filter(data => data.name === reqData.name);
    if (productsWithSaneName.length > 0) {
        return `Duplicate product ${productsWithSaneName[0].name}`;
    }

    return null;
}

function capitalizeNamesForSpecificData(data) {
    let name = data.name;
    let parts = name.split(" ");
    parts = parts.map(part => {
        part = part.toLowerCase();
        part = part.replace(part.substring(0, 1), part.substring(0, 1).toUpperCase());
        return part;
    });

    data.name = parts.join(" ");
    return data;
}