import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RestCard from '../RestCard/RestCard';
import RestaurantModel from '../../../Models/restaurant';
import restService from '../../../Services/RestService';
import { NavLink } from 'react-router-dom';
import { restStore } from '../../../Redux/RestState';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';



const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function RestList() {

  const [restaurants, setRestaurants] = useState<RestaurantModel[]>([]);
  const [user,setUser]= useState<User>();
 
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
    restService.getAllRestaurants().
      then(respnseRestaurants => {setRestaurants(respnseRestaurants)
        console.log(respnseRestaurants);
      }).
      catch(err => alert(err.message));

    const unsubscribeRest = restStore.subscribe(() => {

      const dupRest = restStore.getState().restaurants; 
      setRestaurants([...dupRest]);
    });

    return unsubscribeRest();

  }, []);


  if (!restaurants) {
    
    return <div>Loading...</div>;
  }

    // Event handlers

    const handleDeleteRest = (restId: string) => {
      setRestaurants(prevRest => prevRest.filter(r => r._id !== restId));
    };
    

  return (
    <div>
      <h1 className="font-bold text-2xl text-red-600">Restaurant List</h1>
      <Carousel responsive={responsive}>
        {restaurants.map((restaurant: RestaurantModel) => (
          <RestCard key={restaurant._id} restaurant={restaurant} onDeleteRest={handleDeleteRest} />
        ))}
      </Carousel>
      {user?.authLevel === "admin" &&  <>
      <NavLink to={"/restaurants/newRest"}>
        <button type="submit"
          className=" w-1/3 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >add new rest </button>
      </NavLink></>}
    </div>
  );
};

export default RestList;
