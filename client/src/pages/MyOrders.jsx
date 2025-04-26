import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { currency } = useAppContext();

  const fetchOrders = async () => {
    setMyOrder(dummyOrders); // Replace with actual API call if needed
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-16 pb-16 md:p-10 p-4 space-y-6">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl md:text-3xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-1 bg-primary rounded-full"></div>
      </div>

      {myOrder.map((order, index) => (
        <div
          key={index}
          className="p-6 rounded-lg border border-gray-200 shadow-md bg-white space-y-4"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg font-semibold text-gray-800">
              Order ID: <span className="text-primary">{order._id}</span>
            </p>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.isPaid ? "Paid" : "Pending"}
            </span>
          </div>

          {/* Order Details */}
          <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-6 md:items-center">
            {/* Product */}
            <div className="flex gap-4">
              <img
                src={order.items[0].product.image}
                alt={order.items[0].product.name}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm font-medium text-gray-700">
                    {item.product.name}{" "}
                    {item.quantity > 1 && (
                      <span className="text-primary">x {item.quantity}</span>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600">
              <p className="font-semibold text-black mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
            </div>

            {/* Amount */}
            <p className="text-lg font-semibold text-gray-800">
              {currency} {order.amount}
            </p>

            {/* Payment Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Method:</span> {order.paymentType}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
