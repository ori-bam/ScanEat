import React, { useEffect, useState } from "react";

import { orderDish } from "../../../Models/orderDish";
import { OrderActionType, OrderAction, orderStore } from "../../../Redux/OrderState";
import notifyService from "../../../Services/NotifyService";

interface OrderItemProps {
  dish: orderDish;
  setComment: (comment: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ dish, setComment }) => {
  const [comment, setLocalComment] = useState(dish.comment);

  useEffect(() => {
    setLocalComment(dish.comment);
  }, [dish.comment]);

  const handleRemove = () => {
 
    orderStore.dispatch({ type: OrderActionType.RemoveOrder, payload: dish.dish._id });
    notifyService.success("Dish removed successfully");

  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalComment(event.target.value);
    setComment(event.target.value);
  };

  return (
    <div className="order-card text-amber-600 items-center">
      <li className="order-item  items-center border-b border-gray-200 py-4">
        <div className="flex-grow items-center ml-0.5">
          <h3 className="text-xl font-bold mb-2">name: {dish.dish.name}</h3>
          <div className=" w-1/5 h-1/5 px-3 py-2 border ml-2 rounded-md items-center">
          <img src={dish.dish.image} className="w-full h-full object-cover" />
           </div>
          <p className="text-xl font-bold mb-2">desc: {dish.dish.description}</p>
          <p className="text-gray-500">Price: ${dish.dish.price.toFixed(2)}</p>
          <div className="comment-section mt-4">
            <label htmlFor={`comment-${dish.dish._id}`} className="font-bold">
              Comment: 
            </label>
            <input
              type="textarea"
              id={`comment-${dish.dish._id}`}
              value={comment}
              onChange={handleCommentChange}
              className="w-2/3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default OrderItem;
