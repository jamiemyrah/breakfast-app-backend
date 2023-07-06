const express = require('express');
const router = express.Router();
const fs = require('fs');
const adminControllers = require('../controllers/Admin');
const adminMiddlewares = require('../middleWares/admin');
//const Restrictions = require('../middleWares/Restrictions');

/* GET categories listing. */
router.get('/',/* Restrictions,*/ adminControllers.listAll);

router.get('/getone',/*Restrictions,*/ adminControllers.getOne);
router.get('/getmanybyids',/* Restrictions,*/ adminControllers.getManyByIds);

router.post('/create',
  // adminMiddlewares.makesureCatIsProvidedInTheBody,
  //adminMiddlewares.validateId,
  adminMiddlewares.validateName,
  adminMiddlewares.capitalizeNames,
  adminMiddlewares.checkForDuplicates,
  // should s function from controllers
  adminControllers.create,
);

  router.post('/create-many', 
    // adminMiddlewares.makesureCatIsProvidedInTheBody,
    adminMiddlewares.validateName,
    adminMiddlewares.capitalizeNames,
    adminMiddlewares.checkForDuplicates,
    adminControllers.createMany
  );

router.delete('/:id', adminControllers.delete);

router.patch('/:id/:name', adminControllers.update);
router.put('/:id/:name', []);

router.post('/createTable', [] , adminControllers.createTable); 

module.exports = router;