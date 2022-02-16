const e = require('express');
const express = require('express');
const router = express.Router();


// Get Products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET Request to /products.'
    });
});
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;

    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special id.',
            id: id
        });
    } else {

        res.status(200).json({
            message: 'You passed an ID',
            id: id
        });

    }
});



// POST
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }


    res.status(200).json({
        message: 'Handling POST Request to /products.',
        createdProduct: product
    });
});


// PATCH
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;

    res.status(200).json({
        message: `Updated product id: ${id}`
    })
});


// DELETE
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;

    res.status(200).json({
        message: `Deleted product id: ${id}`
    })
});


module.exports = router;