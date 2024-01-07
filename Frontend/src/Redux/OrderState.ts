import { createStore } from "redux";
import {orderDish} from "../Models/orderDish";
import Order from "../Models/order";

// Define the Order item interface
export class OrderState {
   
  public order: orderDish[] = [];
}

export enum OrderActionType {
  AddOrder,
  RemoveOrder,
  ClearOrder

}

export interface OrderAction {
  type: OrderActionType;
  payload: any;

}

export function orderReducer(currentState = new OrderState(), action: OrderAction): OrderState {
  const newState = { ...currentState };

  switch (action.type) {
    case OrderActionType.AddOrder:
      newState.order.push(action.payload)
      
      break;
    case OrderActionType.RemoveOrder:
      const indexToDelete = newState.order.findIndex(o => o.dish._id === action.payload);
      if (indexToDelete >= 0) {
        newState.order.splice(indexToDelete, 1);
      }
      break;
    case OrderActionType.ClearOrder:
        newState.order = [];
      break;
  }
  return newState;
}


export const orderStore = createStore(orderReducer);
