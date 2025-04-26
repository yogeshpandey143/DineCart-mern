import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/appContext";
import { assets, dummyOrders } from '../../assets/assets';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders); // Simulate fetching data
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

      {orders.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="grid md:grid-cols-[2fr_2fr_1fr_1.5fr] gap-6 items-start p-5 border border-gray-300 rounded-lg bg-white hover:shadow-md transition-shadow duration-300"
        >
          {/* Order Items */}
          <div className="flex gap-4">
            <img
              src={assets.box_icon}
              alt="Order Box Icon"
              className="w-12 h-12 object-cover opacity-60"
            />
            <div className="flex flex-col gap-1">
              {order.items.map((item, itemIndex) => (
                <p key={itemIndex} className="text-sm font-medium text-gray-800">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-indigo-500 ml-1">× {item.quantity}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Address Info */}
          <div className="text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city}, {order.address.state},{" "}
              {order.address.zipcode}, {order.address.country}
            </p>
          </div>

          {/* Total Amount */}
          <div className="text-base font-semibold text-gray-900 my-auto">
            {currency}
            {order.amount}
          </div>

          {/* Order Meta */}
          <div className="flex flex-col text-sm text-gray-600 gap-1">
            <p><span className="font-medium">Method:</span> {order.paymentType}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toDateString()}</p>
            <p>
              <span className="font-medium">Payment:</span>{" "}
              <span
                className={`font-semibold ${
                  order.isPaid ? "text-green-600" : "text-red-500"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
