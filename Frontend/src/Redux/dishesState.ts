import { createStore } from "redux";
import DishModel from "../Models/dish"; 


export class dishesState {
    public dishes: DishModel[] = [];
}

export enum DishesActionType {
    GetDishes,
    AddDishes,
    AddManyDishes,
    UpdateDishe,
    DeleteDishe,
    DeleteAllDishes
}

export interface DishesAction {
    type: DishesActionType;
    payload: any;

}

export function dishReducer(currentState = new dishesState(), action: DishesAction): dishesState {

    const newState = { ...currentState };

    switch (action.type) {
        case DishesActionType.GetDishes:
            console.log(newState.dishes)
            newState.dishes = action.payload;
            console.log(newState.dishes)
            break;
        case DishesActionType.AddDishes:
            newState.dishes.push(action.payload)
            break;
            case DishesActionType.AddManyDishes:
                newState.dishes.push(...action.payload);
                break;
        case DishesActionType.UpdateDishe:
            console.log(action.payload._id)
            const indexToUpdate = newState.dishes.findIndex(r => r._id === action.payload._id);
            console.log("index" ,indexToUpdate,"payload",action.payload  )
            if (indexToUpdate >= 0) {
                newState.dishes[indexToUpdate] = action.payload;
            }
            break;
        case DishesActionType.DeleteDishe:
          
            const indexToDelete = newState.dishes.findIndex(r => r._id === action.payload);
            if (indexToDelete >= 0) {
                newState.dishes.splice(indexToDelete, 1);
            }
            break;
            case DishesActionType.DeleteAllDishes:
                newState.dishes = []; // Set the dishes array to an empty array
                break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const dishStore = createStore(dishReducer);
