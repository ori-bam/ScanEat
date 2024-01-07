import { useEffect, useState } from "react";
import DishModel from "../../../Models/dish";
import dishService from "../../../Services/DishesServise";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import User from "../../../Models/user";


function EditDish(): JSX.Element {
    let {restaurantId, dishId,restaurantName  } = useParams<string>();
    const navigate= useNavigate();
    const [dishes, setDishes] = useState<DishModel[]>([]);
    const [singleDish, setSingleDish] = useState<DishModel>();
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




    useEffect(() => {
        dishService
            .getAllDishedByRestId(restaurantId)
            .then(responseDishes => {
                setDishes(responseDishes);
                const foundDish = responseDishes.find(r => r._id === dishId);
                setSingleDish(foundDish);
              
            })
            .catch(err => alert(err.message));
    }, [restaurantId]);

    const [category, setCategory] = useState('');
    const { register, handleSubmit } = useForm<DishModel>();


    async function send(dish: DishModel) {
        try {
          console.log(dish ,dishId)
          dish._id=dishId;
          dish.category=dish.category;
          await dishService.updateDish(dishId,dish);
          notifyService.success("Dish was updated");
          navigate(`/menu/${restaurantId}/${restaurantName}`)
        } catch (err: any) {
            notifyService.error(err.message);
         
        }
      }
      const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
        console.log(event.target)
    };


    if (!singleDish) {
        return <div>Loading...</div>;
    }



    return (
        <div className="flex flex-col items-center justify-center h-screen mt-5 mb-1">
             {user && user.authLevel==='admin' && <>
            <h2 className="text-3xl font-bold mb-2  text-amber-600">Edit Dish</h2>
            <form className="max-w-md w-fit shadow-md rounded-lg px-6 py-4" onSubmit={handleSubmit(send)}>
                <div className="mb-2">
                    <label htmlFor="name" className="block  text-amber-600 font-semibold mb-2">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        defaultValue={singleDish.name}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"   />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-semibold  text-amber-600 mb-1">
                        Description:
                    </label>
                    <input
                        id="description"
                        type="text"
                        {...register('description')}
                        defaultValue={singleDish.description}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="blockfont-semibold text-amber-600 mb-1">
                        Price:
                    </label>
                    <input
                        id="price"
                        type="decimal"
                        {...register('price')}
                        defaultValue={singleDish.price + ""}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="text-amber-600 block font-semibold mb-1">
                        Category:
                    </label>
                    <select
                        id="category"
                        defaultValue={singleDish.category} // Use defaultValue instead of value
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
                    <label htmlFor="image" className="block font-semibold  text-amber-600 mb-1">
                        PhotoUrl:
                        </label>
                        <div className="mb-4 flex items-center">

                            <input
                                id="image"
                                type="text"
                                {...register('image')}
                                defaultValue={singleDish.image}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"                            />
                            <div className="flex w-1/5 h-1/5 px-3 py-2 border ml-2 rounded-md">
                                <img src={singleDish?.image} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        </div>
                        <button
                            type="submit"
                            className=" w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                        >
                            Update
                        </button>
                    </form></>}
                </div>
                );
};

                export default EditDish;