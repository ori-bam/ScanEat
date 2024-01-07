import axios from 'axios';
import RestaurantModel from '../Models/restaurant';
import appConfig from '../Utils/AppConfig';
import { restStore, RestaurantActionType } from '../Redux/RestState';
import { authStore } from '../Redux/AuthState';

class RestService {
  
  private getHeaders(): { [key: string]: string } {
    return {
      Authorization: "Bearer " + authStore.getState().token,
    };
  }

  public async getAllRestaurants(): Promise<RestaurantModel[]> {
    let restaurants = restStore.getState().restaurants;
    if (restaurants.length === 0) {
      console.log(restaurants)
      const response = await axios.get(appConfig.restUrl);
      
      restaurants = response.data;
      console.log(restaurants);
      restStore.dispatch({ type: RestaurantActionType.GetRests, payload: restaurants });
    }
    return restaurants;
  }

  public async addRestaurant<RestaurantModel>(restaurant: RestaurantModel): Promise<void> {
    const response = await axios.post(appConfig.restUrl + "add ", restaurant, {
      headers: this.getHeaders(), // Add the token to the headers
    });
    const addedRestaurant = response.data.resturant;
    restStore.dispatch({ type: RestaurantActionType.AddRest, payload: addedRestaurant });
  }

  public async updateRestaurant<RestaurantModel>(restaurantId: string, updatedData: RestaurantModel): Promise<any> {
    const response = await axios.put(appConfig.restUrl + `upd/${restaurantId}`, updatedData, {
      headers: this.getHeaders(), // Add the token to the headers
    });
    console.log("Updated Data", updatedData);
    const updatedRestaurant = updatedData;
    restStore.dispatch({ type: RestaurantActionType.UpdateRest, payload: updatedRestaurant });
    return updatedRestaurant;
  }

  public async getRestaurant(restaurantId: string): Promise<any> {
    const response = await axios.get(appConfig.restUrl + `/${restaurantId}`, {
      headers: this.getHeaders(), // Add the token to the headers
    });
    const updatedRestaurant = response.data;
    restStore.dispatch({ type: RestaurantActionType.GetRests, payload: restaurantId });
    return updatedRestaurant;
  }

  public async deleteRestaurant(restaurantId: string): Promise<any> {
    const response = await axios.delete(appConfig.restUrl + `/del/${restaurantId}`, {
      headers: this.getHeaders(), // Add the token to the headers
    });
    console.log("Delete service", restaurantId);
    restStore.dispatch({ type: RestaurantActionType.DeleteRest, payload: restaurantId });
    console.log(response.status);
  }

}
const restService = new RestService();

export default restService;
