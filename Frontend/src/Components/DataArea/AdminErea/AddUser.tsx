import React, { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import User from '../../../Models/user';
import authServise from '../../../Services/AuthServise';
import { useNavigate } from 'react-router-dom';
import notifyService from '../../../Services/NotifyService';
import userService from '../../../Services/UserServise';
import { authStore } from '../../../Redux/AuthState';


function addUser(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>();

  const [usser, setUsser] = useState<User>();

  useEffect(() => {
    setUsser(authStore.getState().user);
  
    const unsubscribeUser = authStore.subscribe(() => {
      setUsser(authStore.getState().user);
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



  async function send(user: User) {
   
    console.log(user)
    try {
      await userService.addUser(user,token)
      notifyService.success("user added ")
      navigate("/usersList");
    } catch (error: any) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-3">
       {usser && usser.authLevel === 'admin' && <>
      <h2 className="text-2xl font-bold mb-0  text-amber-600 mt-2">addUser</h2>
      <form onSubmit={handleSubmit(send)} className="max-w-md w-full shadow-md rounded-lg px-8 py-6">
        <div >
          <label htmlFor="fullName" className="text-amber-600 block font-semibold mb-1">
            Full Name:
          </label>
          <input
            id="fullName"
            type="text"
            {...register('name', { required: true })}
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.fullName && <p className="text-red-500">Full Name is required</p>}
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="text-amber-600 block font-semibold mb-1">
            Email:
          </label>
          <input
            id="email"
            type="text"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.email && <p className="text-red-500">Please enter a valid email address</p>}
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="text-amber-600 block font-semibold mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ })}
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
          {errors.password && errors.password.type === 'pattern' && (
            <p className="text-red-500">Password should contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit.</p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="phone" className="text-amber-600 block font-semibold mb-1">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone',{ required: true })}
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.phone && <p className="text-red-500">Phone is required</p>}
        </div>
        <div className="mb-2">
          <label htmlFor="authLevel" className="block font-semibold text-amber-600 mb-2">
          authLevel:
          </label>
          <input
            id="authLevel"
            type="text"
            {...register('authLevel' , { required: true })}
           
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"          />
        </div>

        <div className="mb-2">
          <label htmlFor="birthday" className="text-amber-600 block font-semibold mb-1">
            Birthday:
          </label>
          <input
            id="birthday"
            type="date"
            {...register('birthday')}
            className="w-full px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.birthday && <p className="text-red-500">Birthday is required</p>}
        </div>

        <button
          type="submit"
          className="w-full text-sm bg-blue-500 mb-2 text-white font-semibold  rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
          addUser
        </button>
      </form></>}
    </div>
  );
}

export default addUser;
