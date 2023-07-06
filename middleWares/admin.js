const executeQuery = require("../database-utils/connect-to-database");

module.exports = {

    validateName(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let cat of req.body) {
                const result = checkNameValidity(res, cat);
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
            return res.send('cat id is required');
        }
        next();
    },

    makesureCategoryIsProvidedInTheBody(req, res, next) {

        if (!req.body) {
            return res.send('No cat provided')
        }
        next();
    },

    async checkForDuplicates(req, res, next) {
        const exisitingAdmin = await executeQuery('SELECT name FROM admin');
        if (Array.isArray(exisitingAdmin)) {
            if (Array.isArray(req.body)) {

                for (let requestCat of req.body) {
                    const result = checkForSpecificDuplicat(res, exisitingAdmin, requestCat);
                    if (result) {
                        return res.status(400).send(result);
                    }
                }

            } else {
                const result = checkForSpecificDuplicat(res, exisitingAdmin, req.body);
                if (result) {
                    return res.status(400).send(result);
                }
            }
        }
        next();
    },

    capitalizeNames(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let cat of req.body) {
                capitalizeNamesForSpecificCat(cat);
            }
        } else {
            capitalizeNamesForSpecificCat(req.body);
        }
        next();
    }

};

function checkNameValidity(res, cat) {
    if (!cat.name || !cat.name.trim()) {
        return 'cat name is required';
    }

    return null;
}

function checkForSpecificDuplicat(res, admin, reqCat) {
    const categoriesWithSaneName =
        admin.filter(cat => cat.name === reqCat.name);
    if (adminWithSaneName.length > 0) {
        return `Duplicate cat ${adminWithSaneName[0].name}`;
    }

    return null;
}

function capitalizeNamesForSpecificCat(cat) {
    let name = cat.name;
    let parts = name.split(" ");
    parts = parts.map(part => {
        part = part.toLowerCase();
        part = part.replace(part.substring(0, 1), part.substring(0, 1).toUpperCase());
        return part;
    });

    cat.name = parts.join(" ");
    return cat;
}