import jwtDecode from "jwt-decode";
import User from "../Models/user";
import { createStore } from "redux";

const startLogoutTimer = (duration: number) => {
  console.log("Remaining time:", duration);

  setTimeout(logout, duration);

  console.log("Logout timer started");
};

const logout = () => {
  // Trigger the logout action
  alert("Your token needs to be renewed");
  authStore.dispatch({ type: AuthActionType.Logout });
  localStorage.removeItem("token");
  localStorage.removeItem("loginTime"); // Remove login time from localStorage when the user logs out

  // Navigate to the login page
  const loginUrl = "/login";
  console.log("Logging out at:", new Date());
  window.location.href = loginUrl;
};

export class AuthState {
  public token: string = null;
  public user: User = null;
  public loginTime: Date = null; // Add the loginTime property

  public constructor() {
    this.token = localStorage.getItem("token");

    if (this.token) {
      let decode = jwtDecode<{ user: User }>(this.token);
      this.user = decode.user;

      // Retrieve login time from localStorage
      const loginTimeString = localStorage.getItem("loginTime");
      if (loginTimeString) {
        this.loginTime = new Date(loginTimeString);
        const currentTime = Date.now();
        const remainingTime = this.loginTime.getTime() + 30 * 60 * 1000 - currentTime;
        if (remainingTime > 0) {
          startLogoutTimer(remainingTime);
          console.log(remainingTime) // Start timer with remaining time
        } else {
          logout(); // If remaining time is negative, trigger logout immediately
        }
      } else {
       // startLogoutTimer(5 * 60 * 1000); // If no login time in localStorage, start timer with 5 minutes
      }

      console.log("Token from localStorage:", this.token);
      console.log("User from localStorage:", this.user);
    }
  }
}

export enum AuthActionType {
  Register,
  Login,
  clearOrders,
  Logout,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Register: //here the payload is: token
    case AuthActionType.Login:
      console.log("Login/Register action:", action);
      newState.token = action.payload;
      const decodedToken = jwtDecode<{ user: User }>(action.payload);
      newState.user = decodedToken.user;
      newState.loginTime = new Date(); // Update loginTime when the user logs in or registers
      localStorage.setItem("token", newState.token);
      localStorage.setItem("loginTime", newState.loginTime.toISOString()); // Save login time to localStorage
      console.log("before");
      startLogoutTimer(30 * 60 * 1000); // 5 minutes in milliseconds
      console.log("after");
      break;

    case AuthActionType.Logout: //here the payload is:
      console.log("Logout action:", action);
      newState.token = null;
      newState.user = null;
      newState.loginTime = null; // Clear loginTime when the user logs out
      localStorage.removeItem("token");
      localStorage.removeItem("loginTime"); // Remove login time from localStorage when the user logs out
      break;

    case AuthActionType.clearOrders:
      newState.user.history = [];
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newState.user));
      break;
  }

  console.log("New state:", newState);
  return newState;
}

export const authStore = createStore(authReducer);
