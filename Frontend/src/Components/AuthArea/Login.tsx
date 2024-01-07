import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import User from '../../Models/user';
import authServise from '../../Services/AuthServise';
import { useNavigate } from 'react-router-dom';
import CredentialsModel from '../../Models/CredentialsModel';
import smlogo from "../../../src/Assets/LOGO.png"
import notifyService from '../../Services/NotifyService';

function Login(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const navigate = useNavigate();
  async function send(credentials: CredentialsModel) {
   // Adjust this breakpoint as needed
    try {
      await authServise.login(credentials)
      notifyService.success(`welcome back`)
      navigate("/restaurants");
    } catch (error: any) {
      console.log(error)
      alert(error.message)
    }
  }
// const isLargeScreen = window.innerWidth >= 768;
  return (
    <div className="flex flex-col items-center justify-center h-screen mb-2 mt-0">
      <h2 className="text-2xl font-bold mb-1 mt-1 text-amber-600">Wellcome Back</h2>
      
        <img src={smlogo} alt="logo" className="w-1/8 h-1/5" />
   
      <h3 className="text-xl font-bold mb-1 mt-1 text-amber-600">Login</h3>
      <form onSubmit={handleSubmit(send)} className="max-w-md w-full shadow-md rounded-lg px-4 py-2">


        <div className="mb-2">
          <label htmlFor="email" className="text-amber-600 block font-semibold mb-2">
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
            {...register('password', { required: true, /*pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ */})}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
          {errors.password && errors.password.type === 'pattern' && (
            <p className="text-red-500"> EX : Aabc1234 .</p>
          )}
        </div>


        <button
          type="submit"
          className="w-full text-sm bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out mt-3"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
