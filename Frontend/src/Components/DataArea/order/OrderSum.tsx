import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import Order from '../../../Models/order';
import { orderDish } from '../../../Models/orderDish';
import orderService from '../../../Services/OrderServise';
import { useParams } from 'react-router-dom';
import User from '../../../Models/user';
import { authStore } from '../../../Redux/AuthState';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../ScrolBTN';



const OrderSum: React.FC = () => {
  const [order, setOrder] = useState<Order>();
  const { orderId } = useParams<{ orderId: string }>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribeOrder = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => {
      unsubscribeOrder();
    };
  }, []);

  useEffect(() => {
    orderService
      .getOrder(orderId)
      .then((resOrder) => {
        setOrder(resOrder);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [orderId]);

  const generateBarcode = () => {
    navigate(`/barcode/${orderId}`);;
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const dishesByCategory: { [category: string]: orderDish[] } = {};
  const categoryOrder = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  
  order.dishes.forEach((dish) => {
    if (!dishesByCategory[dish.dish.category]) {
      dishesByCategory[dish.dish.category] = [];
    }
    dishesByCategory[dish.dish.category].push(dish);
  });
  
  const orderedDishesByCategory: { [category: string]: orderDish[] } = {};
  categoryOrder.forEach((category) => {
    if (dishesByCategory[category]) {
      orderedDishesByCategory[category] = dishesByCategory[category];
    }
  });
  
  // Add categories that are not in the categoryOrder array to the end of the orderedDishesByCategory object
  for (const category of Object.keys(dishesByCategory)) {
    if (!orderedDishesByCategory[category]) {
      orderedDishesByCategory[category] = dishesByCategory[category];
    }
    console.log(orderedDishesByCategory)
  }


  // Organize dishes by category

  
 
  

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-amber-600"> Order </h1>
      <h2 className="text-xl font-bold text-amber-600">Name: {order.username}</h2>
      <h3 className="text-lg mb-4 text-amber-600">Date: {new Date(order.date).toDateString()}</h3>

      {Object.entries(orderedDishesByCategory).map(([category, dishes]) => (
        <div key={category} className="mb-8">
          <hr />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-600">{category}</h3>
          <hr />
          {dishes.map((dish, index) => (
            <div key={index} className="flex mt-4 md:w-2/3 lg:w-1/2 m-auto">
              <div className="w-1/5 h-1/5 px-3 py-2 border ml-2 rounded-md flex justify-center items-center">
                <img src={dish.dish.image} alt={dish.dish.name} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">name: {dish.dish.name}</h4>
                <p className="text-lg md:text-xl lg:text-2xl font-bold mb-2">desc: {dish.dish.description}</p>
                 {dish.comment !== "" &&<>
                <p className="text-lg md:text-xl lg:text-2xl font-bold mb-2">comment: {dish.comment}</p>
             </> }
                <p className="text-gray-500">Price: ${dish.dish.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <hr />
      <p className="text-lg font-bold text-orange-400">Total Price: ${order.price.toFixed(2)}</p>
      {user?.authLevel === 'user' && (
        <>
          <button
            className="bg-transparent hover:bg-yellow-500 text-red-600 font-semibold hover:text-yellow py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
            onClick={generateBarcode}
          >
            Generate Barcode
          </button>
        </>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default OrderSum;