const mongoose = require('mongoose');
const {Category,Dish} = require('./DL/Models/dish.model');


const Restaurant = require('./DL/Models/resturant.model');

// Connect to MongoDB
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Create categories
        const category1 = new Category({ name: 'Appetizers' });
        const category2 = new Category({ name: 'Main Course' });
        const category3 = new Category({ name: 'Desserts' });
        const category4 = new Category({ name: 'Beverages' });

        // Saving the categories to the database
        return Promise.all([category1.save(), category2.save(), category3.save(), category4.save()]);
    })
    .then(([category1, category2, category3, category4]) => {
        // Create restaurants
        const restaurant1 = new Restaurant({
            _id: new mongoose.Types.ObjectId(),
            name: 'Nafis',
            address: '123 Main St',
            desc: "We have it all ",
             image : "https://media.easy.co.il/images/UserThumbs/25994550_1590647429571.jpg",
            phone: 5551234,
            
        });

        const restaurant2 = new Restaurant({
            _id: new mongoose.Types.ObjectId(),
            name: 'BBB',
            address: '456 Elm St',
            desc: "the best burger in the city ",
            image :"https://i.pinimg.com/originals/4b/48/06/4b4806bf3e48f39acbb0ca9254d6a58f.jpg",
            phone: 5555678,
            
        });

        const restaurant3 = new Restaurant({
            _id: new mongoose.Types.ObjectId(),
            name: 'krusty-Krub ',
            address: '789 Oak St',
            desc: "go spongebobe ",
            image : "https://images.complex.com/complex/image/upload/c_fill,g_center,w_1200/fl_lossy,pg_1,q_auto/krusty-krab-viacom_eb1tmr.jpg",
            phone: 5559012,
           
        })
        
        const restaurant4 = new Restaurant({
            _id: new mongoose.Types.ObjectId(),
            name: 'Restaurant ',
            address: '789 Oak St',
            desc: "good restaurant ",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2KYYd2l03pAw8UbWdINc834gMtuZTIHsQAw&usqp=CAU",
            phone: 5559012,
           
        });

        // Saving the restaurants to the database
        return Promise.all([restaurant1.save(), restaurant2.save(), restaurant3.save(),  restaurant4.save(),category1, category2, category3, category4]);
    })
    .then(([ restaurant1, restaurant2, restaurant3, restaurant4]) => {        // Create dishes
        const dishes = [
            {
                name: 'Tomato Bruschetta',
                price: 12,
                description: 'Toasted bread topped with diced tomatoes, garlic, and basil',
                image: "https://example.com/dish1.jpg",
                category: "Appetizers"
            },
            {
                name: 'Grilled Salmon',
                price: 28,
                description: 'Grilled salmon fillet with lemon butter sauce',
                image: "https://example.com/dish2.jpg",
                category: "Main Course"
            },
            {
                name: 'Chocolate Brownie',
                price: 8,
                description: 'Rich chocolate brownie served with vanilla ice cream',
                image: 'https://example.com/dish3.jpg',
                category: "Desserts"
            },
            {
                name: 'Orange Juice',
                price: 5,
                description: 'Freshly squeezed orange juice',
                image: 'https://example.com/dish4.jpg',
                category: "Beverages"
            },
            {
                name: 'Mozzarella Sticks',
                price: 10,
                description: 'Crispy breaded mozzarella sticks served with marinara sauce',
                image: 'https://example.com/dish4.jpg',
                category:"Appetizers",
              },
              
            {
                name: 'Chicken Parmesan',
                price: 18,
                description: 'Breaded chicken breast topped with marinara sauce and melted cheese',
                image: 'https://example.com/dish5.jpg',
                category: "Main Course",
              },
              {
                name: 'Hamburger',
                price: 18,
                description: 'Breaded hamburger and melted cheese',
                image: 'https://example.com/dish5.jpg',
                category: "Main Course",
              },
              
              {
                name: 'Tiramisu',
                price: 9,
                description: 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: 'https://example.com/dish6.jpg',
                category:"Desserts",
              },
              
             {
                name: 'Iced Coffee',
                price: 5,
                description: 'Chilled coffee served with ice cubes',
                image: 'https://example.com/dish7.jpg',
                category:"Beverages",
              }
            // Add more dishes here according to the desired categories
        ];

        const dishPromises = dishes.map((dish) => {
            const restaurantId = getRandomRestaurantId([restaurant1, restaurant2, restaurant3,restaurant4]);
            const newDish = new Dish({
                name: dish.name,
                price: dish.price,
                description: dish.description,
                image: dish.image,
                category: dish.category,
                restaurant: restaurantId
            });
            return newDish.save();
        });

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

    function getRandomRestaurantId(restaurants) {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        return restaurants[randomIndex]._id;
      }
