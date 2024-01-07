import axios, { AxiosRequestConfig } from 'axios';
import appConfig from '../Utils/AppConfig';
import { orderStore , OrderActionType} from '../Redux/OrderState';
import Order from '../Models/order';
import { authStore } from '../Redux/AuthState';

class OrderService {
  
  public async saveOrder(order: Order): Promise<string> {
    try {
      const response = await axios.post(appConfig.orderUrl + "add", order, {
      
      });
      const res = response.data;
      const orderId = res.order;
      return orderId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getOrder(orderId: string): Promise<Order> {
    try {
      const response = await axios.get(`${appConfig.orderUrl}/${orderId}`);
      const order: Order = response.data;
      console.log(order);
      return order;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get order');
    }
  }
  



}

const orderService = new OrderService();

export default orderService;