import { useEffect, useState } from 'react';
import DishModel from '../../../Models/dish';
import dishService from '../../../Services/DishesServise';
import { useForm } from 'react-hook-form';
import {  useNavigate, useParams } from 'react-router-dom';
import notifyService from '../../../Services/NotifyService';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';

function AddDish(): JSX.Element {

    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const { register, handleSubmit } = useForm<DishModel>();
    let { restaurantId ,restaurantName } = useParams<string>();

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





    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
        console.log(event.target)
    };


    async function send(dish: DishModel) {
        console.log(restaurantId)
        try {
            console.log(dish)
            dish.restaurantId = restaurantId;
            dish.restName = restaurantName;
            await dishService.addDish(dish);
            notifyService.success("Dish was added");
            navigate(`/menu/${restaurantId}/${restaurantName}`)
        } catch (err: any) {
            notifyService.error(err.message);
          console.log(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen mt-5 mb-1">
            {user && user.authLevel==='admin' && <>
            <h2 className="text-3xl font-bold mb-4 text-amber-600">Add New Dish</h2>
            <form onSubmit={handleSubmit(send)} className="max-w-md w-full shadow-md rounded-lg px-8 py-6" >
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold mb-1">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="text-amber-600 block font-semibold mb-1">
                        Description:
                    </label>
                    <input
                        id="description"
                        type="text"
                        {...register("description")}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="text-amber-600 block font-semibold mb-1">
                        Price:
                    </label>
                    <input
                        id="price"
                        type="number"
                        {...register("price")}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="text-amber-600 block font-semibold mb-1">
                        Category:
                    </label>
                    <select
                        id="category"
                        defaultValue={category} // Use defaultValue instead of value
                        onChange={handleCategoryChange} // Add onChange event handler
                        {...register("category")}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    >
                        <option value="">Select a category</option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
                        
                    </select>

                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="text-amber-600 block font-semibold mb-1">
                        PhotoUrl:
                    </label>
                    <input
                        id="image"
                        type="text"
                        {...register("image")}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                >
                    Add
                </button>
            </form></>}
        </div>
    );
}

export default AddDish
