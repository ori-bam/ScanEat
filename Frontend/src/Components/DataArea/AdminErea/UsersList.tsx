import React, { useEffect, useState } from 'react';
import UserService from '../../../Services/UserServise'; // Replace with your actual user service
import { authStore } from '../../../Redux/AuthState';
import User from '../../../Models/user';
import PageNotFound from '../../LayoutArea/PageNotFound/PageNotFound';
import { NavLink, useNavigate } from 'react-router-dom';
import { userStore } from '../../../Redux/UserState';
import userService from '../../../Services/UserServise';
import user from '../../../Models/user';
import notifyService from '../../../Services/NotifyService';

const UserList = () => {
    const [users, setUsers] = useState([]);
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


    const navigate = useNavigate();

    useEffect(() => {
      // Fetch initial user list
      UserService.getAllUsers(authStore.getState().token)
        .then((data) => setUsers(data))
        .catch((error) => console.log(error));
    }, []);
  
    const deleteUser = async (userId:string) => {
      try {
        const ok = window.confirm("Are you sure?");
        if (!ok) return;
  
        await userService.deleteUser(userId, token);
        notifyService.success("User was deleted");
  
        // Update the user list after deleting a user
        UserService.getAllUsers(authStore.getState().token)
          .then((data) => setUsers(data))
          .catch((error) => console.log(error));
  
        navigate("/usersList");
      } catch (err) {
        notifyService.error(err);
      }
    };
  
    


    return (<div className="container mx-auto">

        {user && user.authLevel === 'admin' && <>
            <h2 className="text-2xl font-bold mb-4 text-amber-600 flex-col items-center"  >User List</h2>
            {users.map((user, index) => (
                <div key={index} className="order-list space-y-4 ">
                    <p className="text-xl font-bold mb-2">name: {user.name}</p>
                    <p className="text-xl font-bold mb-2">email: {user.email}</p>
                    <p className="text-xl font-bold mb-2">authLevel : {user.authLevel}</p>
                    <div className="mt-2 ">
                        <NavLink to={`/editUser/${user._id}`}>
                            <button type="submit"
                                className=" text-sm px-4 py-2 m-1 p-1 bg-amber-500 text-white rounded-md hover:bg-red-600"
                            >Edit </button>
                        </NavLink>
                        <button
                            className=" text-sm px-4 py-2 m-1 p-1 bg-amber-500 text-white rounded-md hover:bg-red-600"
                         onClick={() => deleteUser(user._id)}
                        >
                            Delete
                        </button>
                    </div>
                    <hr></hr>
                </div>
            ))}
            <NavLink to={"/addUser"}>
                <button type="submit"
                    className=" text-sm px-4 py-2 m-1 p-1 bg-amber-500 text-white rounded-md hover:bg-red-600"
                >add new user </button>
            </NavLink></>}

    </div>
    );
};

export default UserList;
