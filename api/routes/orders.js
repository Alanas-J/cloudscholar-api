const e = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');


// Get Products
router.get('/', (req, res, next) => {

    Order.find()
        .select('_id product quantity')
        .populate('product', '_id name price') // used to parse ID into object data
        .exec()
        .then( result => {
            res.status(200).json({
                count: result.length,
                orders: result.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity
                    }
                })
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productID)
        .then(product => {

            if(!product){
                return res.status(404).json({
                    message: 'No product found with the id:' + req.body.productID
                })
            }

            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productID
            });
        
            return order.save();
        })
        .then( result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        }); 

});


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