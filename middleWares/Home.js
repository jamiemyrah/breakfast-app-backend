const executeQuery = require("../database-utils/execute-query");

module.exports = {

    validateName(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let category of req.body) {
                const result = checkNameValidity(res, category);
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
            return res.send('category id is required');
        }
        next();
    },

    makesureCategoryIsProvidedInTheBody(req, res, next) {

        if (!req.body) {
            return res.send('No category provided')
        }
        next();
    },

    async checkForDuplicates(req, res, next) {
        const exisitingCategories = await executeQuery('SELECT name FROM categories');
        if (Array.isArray(exisitingCategories)) {
            if (Array.isArray(req.body)) {

                for (let requestCategory of req.body) {
                    const result = checkForSpecificDuplicat(res, exisitingCategories, requestCategory);
                    if (result) {
                        return res.status(400).send(result);
                    }
                }

            } else {
                const result = checkForSpecificDuplicat(res, exisitingCategories, req.body);
                if (result) {
                    return res.status(400).send(result);
                }
            }
        }
        next();
    },

    capitalizeNames(req, res, next) {
        if (Array.isArray(req.body)) {
            for (let category of req.body) {
                capitalizeNamesForSpecificCategory(category);
            }
        } else {
            capitalizeNamesForSpecificCategory(req.body);
        }
        next();
    }

};

function checkNameValidity(res, category) {
    if (!category.name || !category.name.trim()) {
        return 'category name is required';
    }

    return null;
}

function checkForSpecificDuplicat(res, categories, reqCategory) {
    const categoriesWithSaneName =
        categories.filter(category => category.name === reqCategory.name);
    if (categoriesWithSaneName.length > 0) {
        return `Duplicate category ${categoriesWithSaneName[0].name}`;
    }

    return null;
}

function capitalizeNamesForSpecificCategory(category) {
    let name = category.name;
    let parts = name.split(" ");
    parts = parts.map(part => {
        part = part.toLowerCase();
        part = part.replace(part.substring(0, 1), part.substring(0, 1).toUpperCase());
        return part;
    });

    category.name = parts.join(" ");
    return category;
}