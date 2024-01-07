import React, { useEffect, useState } from "react";

import { OrderActionType, orderStore } from "../../../Redux/OrderState";
import OrderItem from "./OrderItem";
import { orderDish } from "../../../Models/orderDish";
import User from "../../../Models/user";
import { authStore } from "../../../Redux/AuthState";
import orderService from "../../../Services/OrderServise";
import Order from "../../../Models/order";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import ScrollToTopButton from '../ScrolBTN';





const OrderComponent: React.FC = () => {

  const [orderItems, setOrderItems] = useState<orderDish[]>([]);
  const [user, setUser] = useState<User>();
  const [restName, setrestName] = useState("");
  const [token, setToken] = useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribeUser = authStore.subscribe(() => {
      setUser(authStore.getState().user);
      setToken(authStore.getState().token);
    });

    return () => {
      unsubscribeUser();
    };
  }, [token]);

  useEffect(() => {
    setToken(authStore.getState().token);
    const unsubscribeUser = authStore.subscribe(() => {
      setToken(authStore.getState().token);
      console.log (user,token)
    });
    return () => {
      unsubscribeUser();
    };
  }, []);


  useEffect(() => {
    setOrderItems(orderStore.getState().order);
    const unsubscribeOrder = orderStore.subscribe(() => {
      const dupOrder = orderStore.getState().order;
      setOrderItems([...dupOrder]);
    });

    return () => {
      unsubscribeOrder();
    };
  }, []);

  useEffect(() => {
    setrestName((orderItems[0]?.dish.restName));
  }, [orderItems]);

  const handleCommentChange = (index: number, comment: string) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].comment = comment;
    setOrderItems(updatedOrderItems);

  };

  const calculateOverallPrice = () => {
    let overallPrice = 0;
    orderItems.forEach((orderItem) => {

      overallPrice += orderItem.dish.price;
    });
    return overallPrice;
  };


  const handleSaveOrder = () => {
    let order = new Order()
    order = {
      username: user?.name,
      userId: user?._id,
      restaurantName: restName,
      dishes: orderItems.map((orderItem) => orderItem),
      date: new Date(),
      price: calculateOverallPrice(),
    };
    user.history.push(order)
    orderService
    .saveOrder(order)
    .then((resOrder) => {
     
   orderStore.dispatch({
    type: OrderActionType.ClearOrder,
    payload: undefined
  })
  notifyService.success("Order Saved");
     setOrderItems([])
      
      navigate(`/orderSum/${resOrder}`);
    

    })
    .catch((error) => {
      console.error(error);
     
    });   


  };

  return (
   
      <div className="order-container">
        <div className="order flex flex-col items-center ">
          <h2 className="text-2xl font-bold mb-4 text-amber-600">Order from - {restName}</h2>
          {orderItems.length === 0 ? (
            <p className="text-amber-600">Your order is empty.</p>
          ) : (
            <>
              <ul className="order-list space-y-4 items-center md:w-1/2 justify-center md:justify-start">
                {orderItems.map((orderItem, index) => (
                  <OrderItem
                    key={index}
                    dish={orderItem}
                    setComment={(comment) => handleCommentChange(index, comment)}
                  />
                ))}
                <hr className="w-full my-4" />
              </ul>
              <p className="font-bold mt-4">Overall Price: ${calculateOverallPrice().toFixed(2)}</p>
              <button
                className="px-4 py-2 text-sm bg-blue-500 text-amber-600 hover:bg-blue-600 mt-4"
                onClick={handleSaveOrder}
              >
                Save Order
              </button>
            </>
          )}
        </div>
        <ScrollToTopButton/>
      </div>
    );
};

export default OrderComponent;
