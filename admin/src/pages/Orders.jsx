import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import parcelIcon from "../assets/parcel_icon.svg"; // Import parcel icon

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statushandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.put(`${backendUrl}/api/order/status`, {
        orderId,
        status: event.target.value,
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders(); // Refresh orders after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>
      <div>
        {orders.map((order, index) => {
          const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start border border-gray-200 p-5 rounded-lg shadow-md mb-4"
            >
              {/* Parcel Icon */}
              <div className="mr-4">
                <img src={parcelIcon} alt="Parcel" className="w-12 h-12" />
              </div>

              {/* Order Details */}
              <div className="flex-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium text-gray-700">
                    {item.name} x {item.quantity} <span>{item.size}</span>  
                    <span className="text-gray-500 ml-2">(₹{item.price})</span>
                  </p>
                ))}
                <p className="text-gray-500 text-sm">{order.store || "Great Stock"}</p>

                {/* Address */}
                <div className="mt-2 text-gray-600 text-sm">
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex flex-col items-end sm:ml-4">
                <p className="text-gray-700 font-medium">Items: {order.items.length}</p>
                <p className="text-gray-700">Method: {order.paymentMethod}</p>
                <p className="text-gray-700">
                  Payment: {order.payment ? "Done" : "Pending"}
                </p>
                <p className="text-gray-700">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>

                {/* Total Amount */}
                <p className="text-lg font-semibold mt-2">
                  Total: ₹{totalAmount.toFixed(2)}
                </p>

                {/* Status Dropdown */}
                <select
                  onChange={(event) => statushandler(event, order._id)}
                  className="mt-2 border rounded px-2 py-1 text-gray-700"
                  defaultValue={order.status}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
