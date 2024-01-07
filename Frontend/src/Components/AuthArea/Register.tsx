import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import User from '../../Models/user';
import authServise from '../../Services/AuthServise';
import { useNavigate } from 'react-router-dom';
import notifyService from '../../Services/NotifyService';


function Register(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const navigate = useNavigate();
  async function send(user: User) {
    user.authLevel = "user";
    console.log(user)
    try {
      await authServise.register(user)
      notifyService.success(`welcom ${user.name}`);
      navigate("/restaurants");
    } catch (error: any) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen mb-1">
      <h2 className="text-2xl font-bold mb-1 mt-1 text-amber-600">Register</h2>
      <form onSubmit={handleSubmit(send)} className="max-w-md w-full shadow-md rounded-lg px-8 py-6">
        <div className="mb-2">
          <label htmlFor="fullName" className="text-amber-600 block font-semibold mb-1">
            Full Name:
          </label>
          <input
            id="fullName"
            type="text"
            {...register('name', { required: true })}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
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
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
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
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
          {errors.password && errors.password.type === 'pattern' && (
            <p className="text-red-500"> EX : Aabc1234 .</p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="phone" className="text-amber-600 block font-semibold mb-1">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone', { required: true })}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.phone && <p className="text-red-500">Phone is required</p>}
        </div>

        <div className="mb-2">
          <label htmlFor="birthday" className="text-amber-600 block font-semibold mb-1">
            Birthday:
          </label>
          <input
            id="birthday"
            type="date"
            {...register('birthday', { required: true })}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.birthday && <p className="text-red-500">Birthday is required</p>}
        </div>

        <button
          type="submit"
          className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
