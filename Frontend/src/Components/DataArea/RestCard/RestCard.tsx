import React, { useEffect, useState } from 'react';
import RestaurantModel from '../../../Models/restaurant';
import './RestCard.css';
import { NavLink, useNavigate } from 'react-router-dom';
import restService from '../../../Services/RestService';
import notifyService from '../../../Services/NotifyService';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';

interface RestCardProps {
  restaurant: RestaurantModel;
  onDeleteRest: (restId: string) => void;
}

const RestCard: React.FC<RestCardProps> = (props: RestCardProps) => {
  const navigate= useNavigate();
    async function deletemMe() {
      try{
        const ok= window.confirm("are you sure?")
        if (!ok) return ;
        restService.deleteRestaurant(props.restaurant._id)
      
        props.onDeleteRest(props.restaurant._id);
        notifyService.success("Restaurant was deleted");
        navigate("/restaurants")
      } catch (err: any) {
          notifyService.error(err.message);
      }
    }
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
    

   
  return (
    <div className="RestCard">
      <div className="max-w-xs max-h-68  rounded overflow-hidden shadow-lg">
        <div className="px-4 py-2">
          <h2 className=" text-amber-600 font-semibold text-md mb-2 ">{props.restaurant.name}</h2>
        </div>   
        <NavLink to={`/restCard/${props.restaurant._id}`}>  
        <img className="w-full h-32 object-cover" src={props.restaurant.image} alt={props.restaurant.name} />
        </NavLink> 
        <div className="px-4 py-2">
          <p className=" text-amber-600 text-xs  ">{props.restaurant.desc}</p>
        </div>
        {user?.authLevel === "admin" &&  <>
        <div className="flex justify-center space-x-4">
          <NavLink
            to={`/restaurants/editRest/${props.restaurant._id}`}
            className="text-blue-500 hover:text-blue-700"> edit</NavLink>
          <NavLink to="#" onClick={deletemMe} className="text-red-500 hover:text-red-700">
            delete
          </NavLink>
        </div>
        </>}
        <div className="px-4 pt-2 pb-1">
          <NavLink to={`/menu/${props.restaurant._id}/${props.restaurant.name}`} className="inline-block">
            <div className="bg-transparent hover:bg-yellow-500 text-red-600 font-semibold hover:text-yellow py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
              Our menu
            </div>
          </NavLink>
        </div>
      
      </div>
    </div>
  );
};

export default RestCard;
