const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    userId:{ type: String, required: true },
    username: { type: String, required: true },
    restaurantName: { type: String, required: true },
    dishes: [],
    date: { type: Date, default: Date.now },
    price: { type: Number, required: true }
    // qr: { type: Object._id, required: true },
    

});

module.exports = mongoose.model('Order', orderSchema);