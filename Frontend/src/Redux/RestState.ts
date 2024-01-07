import { createStore } from "redux";
import RestaurantModel from "../Models/restaurant";


export class RestState {
    public restaurants: RestaurantModel[] = [];
}

export enum RestaurantActionType {
    GetRests,
    AddRest,
    UpdateRest,
    DeleteRest
}

export interface RestaurantAction {
    type: RestaurantActionType;
    payload: any;

}

export function restReducer(currentState = new RestState(), action: RestaurantAction): RestState {

    const newState = { ...currentState };

    switch (action.type) {
        case RestaurantActionType.GetRests:
            newState.restaurants = action.payload;
            break;
        case RestaurantActionType.AddRest:
            newState.restaurants.push(action.payload)
            break;
        case RestaurantActionType.UpdateRest:
            const indexToUpdate = newState.restaurants.findIndex(r => {
                return r._id === action.payload._id;

            });
            if (indexToUpdate >= 0) {
                newState.restaurants[indexToUpdate] = action.payload;
            }
            break;
        case RestaurantActionType.DeleteRest:
            const indexToDelete = newState.restaurants.findIndex(r => {
                return r._id === action.payload;
            });
            if (indexToDelete >= 0) {
                newState.restaurants.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const restStore = createStore(restReducer);
