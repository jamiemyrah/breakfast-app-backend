const express = require('express');
const router = express.Router();
const fs = require('fs');
const categoriesController = require('../controllers/categories');
const categoriesMiddlewares = require('../middlewares/categories');

/* GET categories listing. */
router.get('/', categoriesController.listAll);

router.get('/getone', categoriesController.getOne);
router.get('/getmanybyids', categoriesController.getManyByIds);

router.post('/create',
  categoriesMiddlewares.makesureCategoryIsProvidedInTheBody,
  //categoriesMiddlewares.validateId,
  categoriesMiddlewares.validateName,
  categoriesMiddlewares.capitalizeNames,
  categoriesMiddlewares.checkForDuplicates,
  // should s function from controllers
  categoriesController.create,
);

  router.post('/create-many', 
    categoriesMiddlewares.makesureCategoryIsProvidedInTheBody,
    categoriesMiddlewares.validateName,
    categoriesMiddlewares.capitalizeNames,
    categoriesMiddlewares.checkForDuplicates,
    categoriesController.createMany
  );

router.delete('/:id', categoriesController.delete);

router.patch('/:id/:name', categoriesController.update);
router.put('/:id/:name', []);

router.post('/createTable', [
  
], categoriesController.createTable); 

module.exports = router;