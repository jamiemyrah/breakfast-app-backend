const express = require('express');
const router = express.Router();
const fs = require('fs');
const productsController = require('../controllers/products');
const productsMiddlewares = require('../middlewares/products');

/* GET products listing. */
router.get('/', productsController.listAll);

router.get('/getone', productsController.getOne);
router.get('/getmanybyids', productsController.getManyByIds);

router.post('/create',
  productsMiddlewares.makesureProductIsProvidedInTheBody,
  //productsMiddlewares.validateId,
  productsMiddlewares.validateName,
  productsMiddlewares.capitalizeNames,
  productsMiddlewares.checkForDuplicates,
  // should s function from controllers
  productsController.create,
);

  router.post('/create-many', 
    productsMiddlewares.makesureProductIsProvidedInTheBody,
    productsMiddlewares.validateName,
    productsMiddlewares.capitalizeNames,
    productsMiddlewares.checkForDuplicates,
    productsController.createMany
  );

router.delete('/:id', productsController.delete);

router.patch('/:id/:name', productsController.update);
router.put('/:id/:name', []);

router.post('/createTable',productsController.createTable); 

module.exports = router;