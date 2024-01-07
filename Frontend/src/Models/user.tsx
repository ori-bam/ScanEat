import Order from "./order";
class User {
    
    _id: string;
    authLevel :string;
    name: string;
    email: string;
    password: string;   
    phone: string;
    address: string;
    history: Order[];
  }
  
  export default User;