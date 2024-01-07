import React from "react";
import { useDispatch } from "react-redux";
import DishModel from "../../../Models/dish";
import { orderStore, OrderActionType } from "../../../Redux/OrderState";
import { orderDish } from "../../../Models/orderDish"; // Import the orderDish class
import notifyService from "../../../Services/NotifyService";

interface AddToOrderButtonProps {
  dish: DishModel;
 
}

const AddToOrderButton: React.FC<AddToOrderButtonProps> = ({ dish }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");

  const handleAddToOrder = () => {
    const order = orderStore.getState().order;
    
    // Check if the order is empty or if the restaurant name matches the first dish in the order
    if (order.length === 0 || order[0].dish.restaurantId === dish.restaurantId) {
      const newOrderDish = new orderDish(dish, comment);
      orderStore.dispatch({ type: OrderActionType.AddOrder, payload: newOrderDish });
      notifyService.success("Dish added successfully");
    } else {
      // Display an error message if the restaurant names don't match
      notifyService.error("Cannot add dish from a different restaurant to the current order.");
    }
  };

  return (
<div>
  <button
    className="px-4 py-2  text-sm bg-amber-600 text-white rounded hover:bg-amber-700 add-to-Order-button text-base sm:text-sm md:text-lg"
    onClick={handleAddToOrder}
  >
    Add to Order
  </button>
</div>

  );
};

export default AddToOrderButton;

