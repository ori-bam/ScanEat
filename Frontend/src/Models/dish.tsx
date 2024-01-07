class Category {
    name: string;
  }
  
  class DishModel {   
    _id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    restName: string;
    restaurantId: string;
    [key: string]: string | number;
  }
  
  export default  DishModel ;
  

