import React, { useEffect, useState } from "react";
import { orderStore } from "../../../Redux/OrderState";
import { orderDish } from "../../../Models/orderDish";
import OrderIcon from '../../../Assets/icon-order.svg';
import { NavLink } from "react-router-dom";
const Logo: React.FC = () => {
    const [orderItems, setOrderItems] = useState<orderDish[]>([]);

    useEffect(() => {
        const unsubscribeOrder = orderStore.subscribe(() => {
            const dupOrder = orderStore.getState().order;
            setOrderItems([...dupOrder]);
        });

        return () => {
            unsubscribeOrder(); // Unsubscribe from the orderStore when component unmounts
        };
    }, []);

    return (
        
        <div className="logo-container flex items-center mr-2">
         <div>
          {orderItems.length > 0 && <span className="order-count">{orderItems.length}</span>}
        </div>
        <div className="flex-auto">
          <NavLink to="/order" className="order-button">
            <img src={OrderIcon} alt="cart" className="p-2" />
          </NavLink>
        </div>
       
      </div>
    );
};

export default Logo;

