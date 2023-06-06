const executeQuery = require("../database-utils/execute-query");

module.exports = {

    validateName(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let product of req.body) {
                const result = checkNameValidity(res, product);
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
            return res.send('product id is required');
        }
        next();
    },

    makesureProductIsProvidedInTheBody(req, res, next) {

        if (!req.body) {
            return res.send('No product provided')
        }
        next();
    },

    async checkForDuplicates(req, res, next) {
        const exisitingProducts = await executeQuery('SELECT name FROM products');
        if (Array.isArray(exisitingProducts)) {
            if (Array.isArray(req.body)) {

                for (let requestproduct of req.body) {
                    const result = checkForSpecificDuplicat(res, exisitingProducts, requestproduct);
                    if (result) {
                        return res.status(400).send(result);
                    }
                }

            } else {
                const result = checkForSpecificDuplicat(res, exisitingProducts, req.body);
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
                capitalizeNamesForSpecificproduct(product);
            }
        } else {
            capitalizeNamesForSpecificproduct(req.body);
        }
        next();
    }

};

function checkNameValidity(res, product) {
    if (!product.name || !product.name.trim()) {
        return 'product name is required';
    }

    return null;
}

function checkForSpecificDuplicat(res, products, reqproduct) {
    const productsWithSaneName =
        products.filter(product => product.name === reqproduct.name);
    if (productsWithSaneName.length > 0) {
        return `Duplicate product ${productsWithSaneName[0].name}`;
    }

    return null;
}

function capitalizeNamesForSpecificproduct(product) {
    let name = product.name;
    let parts = name.split(" ");
    parts = parts.map(part => {
        part = part.toLowerCase();
        part = part.replace(part.substring(0, 1), part.substring(0, 1).toUpperCase());
        return part;
    });

    product.name = parts.join(" ");
    return product;
}