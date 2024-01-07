import { useEffect, useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RestaurantModel from '../../../Models/restaurant';
import restService from '../../../Services/RestService';
import notifyService from '../../../Services/NotifyService';
import User from '../../../Models/user';
import userService from '../../../Services/UserServise';
import { userStore } from '../../../Redux/UserState';
import { authStore } from '../../../Redux/AuthState';

function editUser(): JSX.Element {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [singleUser, setSingleUser] = useState<User | undefined>(undefined);
  const { register, handleSubmit } = useForm<User>();
  const [token, setToken] = useState<string>();
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
      setToken(authStore.getState().token);
      const unsubscribeUser = authStore.subscribe(() => {
          setToken(authStore.getState().token);

      });

      return () => {
          unsubscribeUser();
      };
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userStore.getState().users;
        const foundUser = response.find((user) => user._id === userId);
        setSingleUser(foundUser);
      } catch (err) {
        alert(err);
      }
    };
  
    fetchUser();
  }, [userId]);

  async function send(user: User) {
    try {
      
      user._id=userId;
      user.email=singleUser.email;
      user.password=singleUser.password
      await userService.updateUser(userId ,user ,token );
      notifyService.success("user was updated");
      navigate('/usersList')
    } catch (err: any) {
        notifyService.error(err.message);
      console.log(err.message);
    }
  }

  if (!singleUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-5 mb-2">
        {user && user.authLevel==='admin' && <>
      <h2 className="text-3xl font-bold mb-4 text-amber-600">Edit User {singleUser.name}</h2>
      <form className="max-w-md w-full shadow-md rounded-lg px-8 py-6" onSubmit={handleSubmit(send)}>
        <div className="mb-2">
          <label className="block text-amber-600 font-semibold mb-2">Name:</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            defaultValue={singleUser.name}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-2">
          <label htmlFor="address" className="block font-semibold text-amber-600 mb-2">
          address:
          </label>
          <input
            id="address"
            type="text"
            {...register('address')}
            defaultValue={singleUser.address}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-2">
          <label htmlFor="authLevel" className="block font-semibold text-amber-600 mb-2">
          authLevel:
          </label>
          <input
            id="authLevel"
            type="text"
            {...register('authLevel')}
            defaultValue={singleUser.authLevel}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block font-semibold text-amber-600 mb-2">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone')}
            defaultValue={singleUser.phone}
          
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"             />
        </div>
        <button
          type="submit"
          className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
          Update
        </button>
      </form></>}
    </div>
  );
}

export default editUser;
