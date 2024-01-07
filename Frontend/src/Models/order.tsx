import { orderDish } from "./orderDish";

class Order {
    username: string;
    userId:string;
    restaurantName: string;
    dishes: orderDish[];
    date: Date;
    price: number;
    _id?: string;
  }
  
  export default Order;
  