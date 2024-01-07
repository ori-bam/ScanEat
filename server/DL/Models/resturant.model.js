const mongoose = require('mongoose');

const resturantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    phone: { type: String, required: true },
    

});

module.exports = mongoose.model('Resturant', resturantSchema);