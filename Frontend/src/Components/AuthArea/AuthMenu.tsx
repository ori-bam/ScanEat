import { useState, useEffect } from "react";
import User from "../../Models/user";
import { authStore ,AuthActionType } from "../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import authServise from "../../Services/AuthServise";


function AuthMenu ():JSX.Element{
    
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




    function logout(){
      authServise.logout()
      alert("good by my frind good by my lover")
    }
    

    return (
        <div className="AuthMenu ">
            
           {!user &&  <> <span className="text-amber-600 m-1" >Hello Guest </span>  <span>|</span>
             <NavLink to="/login" className="text-amber-600 m-1">
                 Log in
             </NavLink> <span>|</span>
             <NavLink to="/register" className="text-amber-600 m-1">
                Register
            </NavLink>

           </>}

           {user && user.authLevel === 'user'&& <>
            <span className = "text-amber-600 m-1"> Hello {user.name} |</span>
           
            <NavLink to="/home" onClick={logout} className="text-amber-600 mr-2">
           Logout 
            </NavLink>
            <span> | </span>

            <NavLink to="/history"  className="text-amber-600">
           History 
            </NavLink>
           
           </>}        
         {  user &&user.authLevel === 'admin' && <>
            <span className = "text-amber-600 m-1"> Hello {authStore.getState().user.name} |</span>
           
            <NavLink to="/home" onClick={logout} className="text-amber-600 mr-2">
           Logout 
            </NavLink>
            <span> | </span>
            <NavLink to="/usersList"  className="text-amber-600">
            Users List 
            </NavLink> 
           
           </>}       


        </div>
    );
}

export default AuthMenu;