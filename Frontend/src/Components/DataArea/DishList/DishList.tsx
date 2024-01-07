import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DishModel from '../../../Models/dish';
import dishService from '../../../Services/DishesServise';
import { NavLink, useParams } from 'react-router-dom';
import DishCard from '../DishCard/DishCard';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';
import ScrollToTopButton from '../ScrolBTN';



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function DishList() {
 
  let { restaurantId, restaurantName } = useParams<string>();

  const [dishes, setDishes] = useState<DishModel[]>([]);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribeOrder = authStore.subscribe(() => {
      setUser(authStore.getState().user);

    });

    return () => {
      unsubscribeOrder();
    };
  }, []);

  useEffect(() => {
    console.log(restaurantId);
    dishService.getAllDishedByRestId(`${restaurantId}`).
      then(respnseDishes => setDishes(respnseDishes)).
      catch(err => {
        console.error(err);
        setDishes([])
      });

  }, [restaurantId]);

  const handleDeleteDish = (dishId: string) => {
    setDishes(prevDish => prevDish.filter(r => r._id !== dishId));
  };

 
  
  function categorizeDishes(dishes: DishModel[]): { [key: string]: DishModel[] } {
    const categorizedDishes: { [key: string]: DishModel[] } = {};
    const categoriesOrder = ["appetizers", "main course", "desserts", "beverages"];
  
    for (const dish of dishes) {
      const category = dish.category.toLowerCase(); // Convert category to lowercase
  
      if (!categorizedDishes[category]) {
        categorizedDishes[category] = [];
      }
  
      categorizedDishes[category].push(dish);
    }
  
    // Create a new object with the categories in the desired order
    const orderedCategorizedDishes: { [key: string]: DishModel[] } = {};
    for (const category of categoriesOrder) {
      if (categorizedDishes[category]) {
        orderedCategorizedDishes[category] = categorizedDishes[category];
      }
    }
  
    console.log(categorizedDishes);
    console.log(orderedCategorizedDishes);
    return orderedCategorizedDishes;
  }
  


  if (user && dishes.length===0  && user.authLevel==='admin') {
    return (

      <><h2>look like this is a new resturant </h2>
        <h3> let's add some dishes </h3>
        <p>you can add the all in one from json file </p>
        <p>or to add them one by one </p>

        <NavLink to={`/menu/newDish/${restaurantId}/${restaurantName} `}>
          <button type="submit"
            className="text-xs w-1/4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >Add New Dish </button>
        </NavLink>
        <NavLink to={`/dishUploder/${restaurantId}/${restaurantName} `}>
          <button type="submit"
            className=" text-xs w-1/4 m-auto bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >Add Multiple Dishes </button>
        </NavLink>
      </>
    )
  }



  return (
    <div className="menu-container ">
      <h2 className="text-s md:text-xl  lg:text-2xl xl:text-2xl  text-amber-700 text-center">{restaurantName} Menu</h2>
      <div>

        {Object.entries(categorizeDishes(dishes)).map(([category, dishes]) => (

          <div key={category} className="category-container">
            <h3 className="text-s md:text-lg lg:text-1xl xl:text-2xl pt-3">{category}</h3>
            <hr></hr>
            <Carousel responsive={responsive}>
              {(dishes as DishModel[]).map((dish, index) => (
                <div key={index} className="dish-card w-fit h-3/4 flex items-center justify-center mt-6 ">
                  <DishCard dish={dish} restName={restaurantName} onDeleteDish={handleDeleteDish} />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>

      {user?.authLevel === "admin" && <>
        <NavLink to={`/menu/newDish/${restaurantId}/${restaurantName} `}>
          <button type="submit"
            className="text-xs w-1/4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >Add New Dish </button>
        </NavLink>
        <NavLink to={`/dishUploder/${restaurantId}/${restaurantName} `}>
          <button type="submit"
            className=" text-xs w-1/4 m-auto bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >Add Multiple Dishes </button>
        </NavLink>
      </>}
      <ScrollToTopButton />
    </div>
  );
};

export default DishList;