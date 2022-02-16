const express = require('express');
const router = express.Router();

//MongoDB model
const mongoose = require('mongoose');
const Product = require('../models/product');


// Get Products
router.get('/', (req, res, next) => {

        // You can set a limit somehow instead of query all for pagination
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);

            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
});
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;

    //Querying mongoDB ========
    Product.findById(id)
        .exec()
        .then(doc => {
            if(doc){
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No Valid entry found for provided for ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        }); 
});



// POST
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    // used to save to the DB.
    product.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST Request to /products.',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    }); 
});


// PATCH
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;

    Product.updateOne({_id: id}, { 
        $set: { name: req.body.name, price: req.body.price}})
        .exec()
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


// DELETE
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;

    Product.remove({_id: id})
        .exec()
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


module.exports = router;