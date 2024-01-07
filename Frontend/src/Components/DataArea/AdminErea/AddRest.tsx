import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RestaurantModel from "../../../Models/restaurant";
import restService from "../../../Services/RestService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import User from "../../../Models/user";
import { authStore } from "../../../Redux/AuthState";
import PageNotFound from "../../LayoutArea/PageNotFound/PageNotFound";


function AddRest(): JSX.Element {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(authStore.getState().user);
  
    const unsubscribeUser = authStore.subscribe(() => {
      setUser(authStore.getState().user);
      console.log(authStore.getState().user);
    });
  
    return () => {
      unsubscribeUser();
    };
  }, [authStore.getState().user]);


  const { register, handleSubmit } = useForm<RestaurantModel>();
  const navigate = useNavigate();
  async function send(rest: RestaurantModel) {
    try {
      console.log(rest)
      await restService.addRestaurant(rest);
      notifyService.success("Restaurant was added");
      navigate('/restaurants');
    } catch (err: any) {
        notifyService.error(err.message);
    
    }
  }

  return (
    
    <div className="flex flex-col items-center justify-center h-screen mb-3 mt-2 ">


    
      {user && user.authLevel==='admin' && <>
      <h2 className="text-xl font-bold mb-1 mt-4 text-amber-600">Add New restaurant</h2>
      <form onSubmit={handleSubmit(send)} className="max-w-md w-full shadow-md rounded-lg px-8 ">
        <div className="mb-2">
          <label htmlFor="name" className="text-amber-600 block font-semibold mb-1">
            Name:
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="address" className="text-amber-600 block font-semibold mb-1">
            Address:
          </label>
          <input
            id="address"
            type="text"
            {...register("address" )}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="desc" className="text-amber-600 block font-semibold mb-1">
            Description:
          </label>
          <input
            id="desc"
            type="text"
            {...register("desc")}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image" className="text-amber-600 block font-semibold mb-1">
            PhotoURL:
          </label>
          <input
            id="image"
            type="text"
           
            {...register("image")}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="text-amber-600 block font-semibold mb-1">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone')}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out mb-2"
        >
          Add
        </button>
      </form>
      </>}
    </div>
  );
}

export default AddRest;
