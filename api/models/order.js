const mongoose = require('mongoose'); // MongoDB connection driver


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, // one to one relationship.
    quantity: {type : Number, default: 1}
})

module.exports = mongoose.model('Order', orderSchema);