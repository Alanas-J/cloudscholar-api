const express = require('express');
const router = express.Router();

//MongoDB model
const mongoose = require('mongoose');
const Product = require('../models/product');

// Authentication
const checkAuth = require('../middleware/check-auth');


// File storage
const multer = require('multer'); // used to parse formdata requests, bodyparser doesnt provie this function
const e = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true);
    }
    else{
        cb(null, false); // decline file
    }
}
const upload = multer({storage: storage, limits: {fileSize: 1024*1024*5}, fileFilter: fileFilter}); // used to store files in this dest


// Get Products
router.get('/', (req, res, next) => {

        // You can set a limit somehow instead of query all for pagination
    Product.find()
        .select('productImage name price _id') // used to select specific fields
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:8086/"+doc._id
                        }
                    }
                })
            };

            console.log(response);

            res.status(200).json(response);
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
        .select('productImage name price _id')
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
router.post('/', checkAuth, upload.single('productImage'),(req, res, next) => {
    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    // used to save to the DB.
    product.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST Request to /products.',
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                request: {
                    type: "GET",
                    url: "http://localhost:8086/"+result._id
                }
            }
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