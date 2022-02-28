exports.get = (req, res, next) => {
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
}

exports.update = (req, res, next) => {
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
}


