const express = require('express');
const router = express.Router();
const OrdersController  = require('../controllers/Orders');

router.route('/find-by-id').get(OrdersController.findById);
router.route('/find-one').get(OrdersController.findOne);
router.route('/find-and-count-all').get(OrdersController.findAndCountAll);
router.route('/create').post(OrdersController.create);
router.route('/update-by-id').patch(OrdersController.updateById);
router.route('/update').patch(OrdersController.update);
router.route('/delete-by-id').delete(OrdersController.deleteById);
router.route('/delete').delete(OrdersController.delete);
router.route('/delete-one').delete(OrdersController.deleteOne);



module.exports = router;
