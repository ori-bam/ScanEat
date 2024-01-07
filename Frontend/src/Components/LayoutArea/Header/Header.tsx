import "./Header.css";
import { NavLink } from "react-router-dom";
import smlogo from "../../../Assets/LOGO.png";
import OrderIcon from '../../../Assets/icon-order.svg';
import AuthMenu from "../../AuthArea/AuthMenu";
import Logo from "../../DataArea/order/logo";
import authServise from "../../../Services/AuthServise";
import { useState, useEffect } from "react";
import User from "../../../Models/user";
import { authStore } from "../../../Redux/AuthState";

function Header(): JSX.Element {
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
  
      <nav id="header" className="w-full bg-gradient-to-b from-slate-600 to-transparent text-white mb-2 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="logo-wrapper pl-4 flex items-center">
          <NavLink
            to="/"
            className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <img src={smlogo} alt="logo" className="w-1/3 h-1/3 object-cover" />
          </NavLink>
        </div>
        <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
          <h1 className="font-bold text-4xl text-amber-600">ScanEat</h1>
        </div>
        <div className="flex items-start justify-center space-x- mx-2.5">

        {user?.authLevel === "user" &&  <>
          <div className="logo-container">
            <Logo />
          </div>
          </>
          }
          <AuthMenu />
        </div>
      </div>
    </nav>
      );
    }

export default Header;
