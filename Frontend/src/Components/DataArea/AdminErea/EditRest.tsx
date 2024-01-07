import { useEffect, useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RestaurantModel from '../../../Models/restaurant';
import restService from '../../../Services/RestService';
import notifyService from '../../../Services/NotifyService';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';

function EditRest(): JSX.Element {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [singleRest, setSingleRest] = useState<RestaurantModel | undefined>(undefined);
  const { register, handleSubmit } = useForm<RestaurantModel>();

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
    restService
      .getAllRestaurants()
      .then((responseRest: RestaurantModel[]) => {
        const foundRest = responseRest.find((r) => r._id === restaurantId);
        setSingleRest(foundRest);
      })
      .catch((err) => alert(err.message));
  }, [restaurantId]);
  

  async function send(rest: RestaurantModel) {
    try {
      
      rest._id=restaurantId;
      await restService.updateRestaurant(restaurantId,rest);
      notifyService.success("Resraurant was updated");
      navigate('/restaurants')
    } catch (err: any) {
        notifyService.error(err.message);
      console.log(err.message);
    }
  }

  if (!singleRest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-6 mb-1">
      {user && user.authLevel==='admin' && <>
      <h2 className="text-3xl font-bold text-amber-600">Edit Rest</h2>
      <form className="max-w-md w-full shadow-md rounded-lg px-8 py-6" onSubmit={handleSubmit(send)}>
        <div className="mb-1">
          <label className="block text-amber-600 font-semibold mb-1">Name:</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            defaultValue={singleRest.name}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-1">
          <label htmlFor="description" className="block font-semibold text-amber-600 mb-1">
            Description:
          </label>
          <input
            id="description"
            type="text"
            {...register('desc')}
            defaultValue={singleRest.desc}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-1">
          <label htmlFor="address" className="block font-semibold text-amber-600 mb-1">
            Address:
          </label>
          <input
            id="address"
            type="text"
            {...register('address')}
            defaultValue={singleRest.address}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-1">
          <label htmlFor="phone" className="block font-semibold text-amber-600 mb-1">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone')}
            defaultValue={singleRest.phone}
          
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"             />
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
                                defaultValue={singleRest.image}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"                            />
                            <div className="flex w-1/5 h-1/5 px-3 py-2 border ml-2 rounded-md">
                                <img src={singleRest?.image} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        </div>
        <button
          type="submit"
          className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out mt-1"
        >
          Update
        </button>
      </form></>}
    </div>
  );
}

export default EditRest;
