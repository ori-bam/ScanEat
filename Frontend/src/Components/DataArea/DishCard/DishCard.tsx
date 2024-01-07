import React, { useEffect, useState } from 'react';
import DishModel from '../../../Models/dish';
import AddToOrderButton from './AddTOrderB';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import dishService from '../../../Services/DishesServise';
import notifyService from '../../../Services/NotifyService';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';

interface DishCardProps {
  dish : DishModel;
  restName:string;
  onDeleteDish: (DishId: string) => void;
}

const DishCard: React.FC<DishCardProps> = (props: DishCardProps) => {

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



  const navigate= useNavigate();
  async function deletemME() {
    try{
      const ok= window.confirm("are you sure?")
     if (!ok)  return;
     console.log("props.dish._id:" ,props.dish._id);
      dishService.deleteDish(props.dish._id);
      props.onDeleteDish(props.dish._id);
      notifyService.success("Dish was deleted");
      navigate(`/menu/${props.dish.restaurantId}/${props.restName}`)
    } catch (err: any) {
        notifyService.error(err.message);
    }
  }
  return (
<div className="DishCard p-5">
  <div className="max-w-xs h-68 rounded overflow-hidden shadow-lg">
    <div className="px-4 py-2">
      <h2 className="text-amber-600 font-semibold text-md mb-2">{props.dish.name}</h2>
    </div>
    <NavLink to={`/dishDT/${props.dish._id}/${props.dish.restaurantId}`}>  
    <img className="w-full h-32 object-cover" src={props.dish.image} alt={props.dish.name} />
        </NavLink> 
   
    <div className="px-4 py-2">
      <p className="text-amber-600 text-xs line-clamp-4">{props.dish.description}</p>
    </div>
    <div className="px-4 py-2">
      <p className="text-amber-600 text-xs line-clamp-4">price: {props.dish.price}</p>
    </div>
    {user?.authLevel === "admin" &&  <>
    <div className="flex justify-center space-x-4">
          <NavLink
            to={`/editDish/${props.dish.restaurantId}/${props.dish._id}/${props.restName}`}
            className="text-blue-500 hover:text-blue-700"> edit</NavLink>
          <NavLink to="#"  onClick={deletemME} className="text-red-500 hover:text-red-700">
            delete
          </NavLink>
        </div>
        </>}
        {user?.authLevel === "user" &&  <>
    <div className="px-4 pt-2 pb-1">
      <AddToOrderButton dish={props.dish} />
    </div>
    </>}
  </div>
</div>
  );
};

export default DishCard;
