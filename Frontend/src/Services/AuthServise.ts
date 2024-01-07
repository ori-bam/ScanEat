import axios from "axios";
import User from "../Models/user";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class authServie{

    public async register(user:User): Promise<void> {
       
        const response = await axios.post<string>(appConfig.registerUrl,user);

        const responseData = JSON.parse(JSON.stringify(response.data));
        const token = responseData.token;
        console.log(token);
        authStore.dispatch({type:AuthActionType.Register,payload:token});
        console.log(authStore.getState().user)
    }

    public async login(credentials:CredentialsModel): Promise<void> {
       
        const response= await axios.post<string>(appConfig.loginUrl,credentials);
     
        const responseData = JSON.parse(JSON.stringify(response.data));
        const token = responseData.token;
        console.log(token);
        authStore.dispatch({type:AuthActionType.Login,payload:token});
        console.log(authStore.getState().user)
       
    }

    public logout():void{

        authStore.dispatch({type:AuthActionType.Logout});

    }




}

const authServise = new authServie();

export default authServise