const e = require('express');
const express = require('express');
const router = express.Router();


// Get Products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET Request to /orders.'
    });
});

router.post('/', (req, res, next) => {

    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: 'Handling POST Request to /orders.',
        order: order
    });
});


router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;

    res.status(200).json({
        message: `Got order ID: ${id}`
    });
});

module.exports = router;