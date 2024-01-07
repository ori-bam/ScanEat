const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Category, Dish } = require('./DL/Models/dish.model');
const Restaurant = require('./DL/Models/resturant.model');

// Connect to MongoDB
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Create categories
    const categories = [
      { name: 'Appetizers' },
      { name: 'Main Course' },
      { name: 'Desserts' },
      { name: 'Beverages' }
    ].slice(0, 4); // Select only 4 categories

    const categoryPromises = categories.map(category => new Category(category).save());

    // Saving the categories to the database
    return Promise.all(categoryPromises);
  })
  .then((categories) => {
    // Create restaurants
    const restaurants = [];
    for (let i = 0; i < 4; i++) {
      const restaurant = {
        _id: new mongoose.Types.ObjectId(),
        name: faker.company.name(2),
        address: faker.location.streetAddress(),
        desc: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr({ category: 'food' }),
        phone: faker.phone.number(),
      };
      restaurants.push(restaurant);
    }

    const restaurantPromises = restaurants.map(restaurant => {
      const newRestaurant = new Restaurant({
        _id: restaurant._id,
        name: restaurant.name,
        address: restaurant.address,
        desc: restaurant.desc,
        image: restaurant.image,
        phone: restaurant.phone,
      });
      return newRestaurant.save();
    });

    return Promise.all([...restaurantPromises, ...categories]);
  })
  .then(([...results]) => {
    const categories = results.slice(-4);
    const restaurants = results.slice(0, -4);

    // Create dishes
    const dishes = [];

    const generateDishes = (restaurant, category) => {
      const categoryDishes = [];
      const dishNames = new Set();

      while (categoryDishes.length < 5) {
        const name = faker.commerce.productName(2);

        if (!dishNames.has(name)) {
          categoryDishes.push({
            name,
            price: faker.commerce.price({ min: 100, max: 200 }),
            description: faker.lorem.sentence(5),
            image: faker.image.urlLoremFlickr({ category: 'food' }),
            category: category.name,
            restName:restaurant.name,
            restaurantId: restaurant._id,
            
          });

          dishNames.add(name);

        }
      }

      return categoryDishes;
    };

    categories.forEach(category => {
      restaurants.forEach(restaurant => {
        dishes.push(...generateDishes(restaurant, category));
      });
    });

    const dishPromises = dishes.map(dish => new Dish(dish).save());

    // Saving the dishes to the database
    return Promise.all(dishPromises);
  })
  .then(() => {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Data added successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
