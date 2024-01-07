import DishModel from "./dish";

export class orderDish {
  dish: DishModel;
  comment: string ;

  constructor(dish: DishModel, comment: string) {
    this.dish = dish;
    this.comment = comment;
  }
}