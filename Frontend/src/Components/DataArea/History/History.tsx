import React, { useEffect, useState } from 'react';
import User from '../../../Models/user';
import { AuthActionType, authStore } from '../../../Redux/AuthState';
import Order from '../../../Models/order';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../ScrolBTN';
import userService from '../../../Services/UserServise';
import notifyService from '../../../Services/NotifyService';


const OrdersHistory = () => {
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

    const orders = user?.history || [];

    const generateBarcode = (orderId: string) => {
        navigate(`/barcode/${orderId}`);;
    };

    const handleClearOrderHistory = (userId: string) => {
        userService.clearUserHistory(userId, authStore.getState().token)
          .then((updatedUser:User) => {
            // Handle the response or perform additional actions
            console.log('User history cleared:', updatedUser);
            authStore.dispatch({type:AuthActionType.clearOrders,payload:undefined})
            notifyService.success("History removed successfully");
            navigate('/home');
          })
          .catch((err:any) => {
            // Handle the error, if any
            console.error('Error clearing user history:', err);
          });
      };



        return (
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4">{user?.name} Orders History</h1>
              {orders.map((order, index) => (
                <div key={index} className="mb-4 ">
                  <div className="p-4 rounded-lg flex-auto justify-items-center">
                    <h2>order number {index + 1}</h2>
                    <hr></hr>
                    <h2 className="text-lg font-bold text-amber-600">Restaurant: {order.restaurantName}</h2>
                    <p className="text-red-500">Date: {new Date(order.date).toDateString()}</p>
                    <p className="text-red-500">Total Dishes: {order.dishes.length}</p>
                    <p className="text-red-500">Total Price: ${order.price.toFixed(3)}</p>

                    <div className="m-auto p-2">
                      <button
                        className="text-sm bg-transparent hover:bg-yellow-500 text-red-600 font-semibold hover:text-yellow py-2 px-2 border border-yellow-500 hover:border-transparent rounded"
                        onClick={() => generateBarcode(order._id)}
                      >
                        Generate Barcode
                      </button>
                    </div>
                    <div className="m-auto p-2">
                      <button
                        onClick={() => navigate(`/orderSum/${order._id}`)}
                        className="text-sm bg-transparent hover:bg-yellow-500 text-red-600 font-semibold hover:text-yellow py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                      >
                        Full Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 ? (
                <p className="text-amber-600">You have no history.</p>
              ) : (
                orders.length > 0 && (
                  <>
                    <hr></hr>
                    <div className="mt-4">
                      <button
                        onClick={() => handleClearOrderHistory(user._id)}
                        className="text-sm bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Clear Order History
                      </button>
                    </div>
                  </>
                )
              )}
              <ScrollToTopButton />
            </div>
          );
        };
        
        export default OrdersHistory;