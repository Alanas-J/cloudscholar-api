const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const OrderController = require('../controllers/orders');

// Get Products
router.get('/', OrderController.orders_get_all);

router.post('/', OrderController.post);


router.get('/:orderID', (req, res, next) => {
    Order.findById(req.params.orderID)
        .populate('product')
        .exec()
        .then( order => {

            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                order
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        }); 
});

router.delete('/:orderID', (req, res, next) => {
    Order.remove(req.params.orderID)
        .exec()
        .then( result => {
            res.status(200).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        }); 
});


module.exports = router;