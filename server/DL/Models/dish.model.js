const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: { type: String, required: true }
})

const DishSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    restName: {type: String, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});




const Category = mongoose.model('Category', CategorySchema)
const Dish = mongoose.model('Dish', DishSchema)

module.exports = { Category, Dish }