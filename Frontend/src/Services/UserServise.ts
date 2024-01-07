import axios, { AxiosRequestConfig } from 'axios';

import appConfig from '../Utils/AppConfig';
import { restStore, RestaurantActionType } from '../Redux/RestState';
import User from '../Models/user';
import { UserActionType, userStore } from '../Redux/UserState';
import { authStore } from '../Redux/AuthState';






class UserService {

    
  public async getAllUsers(token:string): Promise<User[]> {
    const config: AxiosRequestConfig = {
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    let users = userStore.getState().users

    if (users.length === 0) {

      const response = await axios.get(appConfig.userUrl,config);

      users = response.data
      userStore.dispatch({ type: UserActionType.GetUsers, payload: users })
    }
    return users;



  }
  public async clearUserHistory(userId: string, token: string): Promise<any> {
    
    const response = await axios.post(
      appConfig.userUrl + `/clear-history/${userId}`,
      {}
  
    );

    const updatedUser = response.data;
    userStore.dispatch({ type: UserActionType.UpdateUser, payload: updatedUser });
    return updatedUser;
  }



  public async addUser <User> (user:User ,token:string):Promise<void>{
    
    const config: AxiosRequestConfig = {
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.post(appConfig.userUrl + "/register ", user,config)
    const addedUser = response.data.user; 
    userStore.dispatch({type:UserActionType.AddUser,payload:addedUser})
    
  } 

  public async updateUser<User>(userId: string, updatedData: User ,token:string): Promise<any> {
    const config: AxiosRequestConfig = {
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.put(appConfig.userUrl + `upd/${userId}`, updatedData,config);
    console.log("Updated Data", updatedData);
    const updatedUser = updatedData;
    userStore.dispatch({ type: UserActionType.UpdateUser, payload: updatedUser });
    return updatedUser;

  }

  public async getRestaurant(restaurantId: string): Promise<any> {

    const response = await axios.get(appConfig.restUrl + `/${restaurantId}`);
    const updatedRestaurant = response.data
    restStore.dispatch({ type: RestaurantActionType.GetRests, payload: restaurantId })

    return updatedRestaurant;

  }


  public async deleteUser(userId: string,token:string): Promise<any> {
    const config: AxiosRequestConfig = {
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.delete(appConfig.userUrl + `/del/${userId}`,config);
    console.log("Delete service", userId);
    userStore.dispatch({ type: UserActionType.DeleteUser, payload: userId })

    console.log(response.status)


  }

}
const userService = new UserService();

export default userService;
