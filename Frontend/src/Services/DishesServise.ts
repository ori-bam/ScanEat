import axios from 'axios';
import Dish from "../Models/dish"
import appConfig from '../Utils/AppConfig';
import { dishStore , DishesActionType} from '../Redux/dishesState';
import { Notyf } from 'notyf';
import notifyService from './NotifyService';
import DishModel from '../Models/dish';
import { authStore } from '../Redux/AuthState';


class DishService {
  
  public async getAllDishedByRestId(resotruntid: string): Promise<Dish[]> {
    let alldishes = dishStore.getState().dishes;
    let dishes = alldishes.filter((dish) => dish.restaurantId === resotruntid);
    dishStore.dispatch({
      type: DishesActionType.DeleteAllDishes,
      payload: undefined,
    });
    if (dishes.length === 0) {
      try {
        const response = await axios.get(appConfig.dishUrl + resotruntid, {
         /*headers: {
           
            Authorization: "Bearer " + authStore.getState().token // Add the token to the 'Authorization' header
          },*/
        });
        dishes = response.data;
        dishStore.dispatch({ type: DishesActionType.GetDishes, payload: dishes });
      } catch (error) {
        console.log("Error fetching dishes:", error);
      }
    }
    return dishes;
  }
    
   
  public async updateDish(dishId: string, updatedData: any): Promise<any> {
    try {
      const response = await axios.put(
        `${appConfig.dishUrl}upd/${dishId}`,
        updatedData
     
      );

      const updatedDish: Dish = response.data; // Assuming the response data is of type Dish
      console.log(updatedDish);
      console.log(response.status);
      dishStore.dispatch({ type: DishesActionType.UpdateDishe, payload: updatedDish });
      return updatedDish;
    } catch (error) {
      console.error("Error updating dish:", error);
      throw error;
    }
  }
      

  public async addDish(newdData: DishModel): Promise<any> {
    try {
      const response = await axios.post(
        `${appConfig.dishUrl}/add`,
        newdData,
        {
          headers: {
            Authorization: "Bearer " + authStore.getState().token, // Add the token to the 'Authorization' header
          },
        }
      );

      let dishes = dishStore.getState().dishes;
      dishes.push(newdData);
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.error("Error adding dish:", error);
      throw error;
    }
  }

  public async addManyDish(newdData: DishModel[]): Promise<any> {
    try {
      const response = await axios.post(
        appConfig.dishUrl+"/addMany",
        newdData,
     
      );

      let dishes = [];
      dishes.push(...newdData);
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.error("Error adding many dishes:", error);
      throw error;
    }
  }

  public async deleteDish(dishId: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${appConfig.dishUrl}/del/${dishId}`,
        {
          headers: {
            Authorization: "Bearer " + authStore.getState().token, // Add the token to the 'Authorization' header
          },
        }
      );

      dishStore.dispatch({ type: DishesActionType.DeleteDishe, payload: dishId });
      console.log(response.status);
    } catch (error) {
      console.error("Error deleting dish:", error);
      throw error;
    }
  }
      };


const dishService = new DishService();

export default dishService;
