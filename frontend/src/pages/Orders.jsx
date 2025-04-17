import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Function to Load Orders
  const loadOrderData = async () => {
    if (!token) {
      console.error("No token found! User is not authenticated.");
      return;
    }

    try {
      console.log("Fetching orders with token:", token); // Debugging

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // Correct header
      );

      console.log("Orders fetched:", response.data);

      // Process Order Data Correctly
      const allOrdersItem = [];
      response.data.orders.forEach((order) => {
        order.items.forEach((item) => {
          allOrdersItem.push({
            ...item, // Spread existing item properties
            state: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          });
        });
      });

      setOrderData(allOrdersItem.reverse()); // Reverse to show latest orders first
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-6">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="mt-6 space-y-6">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700">
              {/* Product Details */}
              <div className="flex items-center justify-between">
                {/* Left Side: Product Image + Details */}
                <div className="flex items-center gap-4">
                  <img className="w-16 sm:w-20" src={item.image?.[0]} alt={item.name} />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size || "M"}</p>
                    <p className="text-gray-400 text-sm">Date: {item.date || "N/A"}</p>
                  </div>
                </div>

                {/* Right Side: Ready to Ship & Track Order Button */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-sm md:text-base">{item.state || "Processing"}</p>
                  </div>

                  <button className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
