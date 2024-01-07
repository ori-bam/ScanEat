import { createStore } from "redux";

import User from "../Models/user";


export class UserState {
    public users: User[] = [];
}

export enum UserActionType {
    GetUsers,
    AddUser,
    UpdateUser,
    DeleteUser
}

export interface UserAction {
    type: UserActionType;
    payload: any;

}

export function userReducer(currentState = new UserState(), action: UserAction): UserState {

    const newState = { ...currentState };

    switch (action.type) {
        case UserActionType.GetUsers:
            newState.users = action.payload;
            break;
        case UserActionType.AddUser:
            newState.users.push(action.payload)
            break;
            
        case UserActionType.UpdateUser:
            const indexToUpdate = newState.users.findIndex(r => {
                return r._id === action.payload._id;

            });
            if (indexToUpdate >= 0) {
                newState.users[indexToUpdate] = action.payload;
            }
            break;
        case UserActionType.DeleteUser:
            const indexToDelete = newState.users.findIndex(r => {
                return r._id === action.payload;
            });
            if (indexToDelete >= 0) {
                newState.users.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}


// 5. Products Store - The manager object handling redux:
export const userStore = createStore(userReducer);
