import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const { backendUrl, token, cartItems, getCartAmount, delivery_fee, products, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!selectedMethod) {
      alert("Please select a payment method!");
      return;
    }

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: selectedMethod
      };

      switch (selectedMethod) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'razorpay':
          // Redirect to Razorpay hosted checkout page
          window.location.href = "https://razorpay.com/?utm_source=bing&utm_medium=cpc&utm_campaign=&utm_adgroup=&utm_content=RPSME-Brand-050724&utm_term=razorpay&utm_gclid=&utm_campaignID=580151510&utm_adgroupID=1260041977203200&utm_adID=&utm_network=o&utm_device=c&msclkid=73ec6371b05116ebd6e9048a7ca4e718";
          break;

        case 'stripe':
          // Redirect to Stripe hosted checkout page
          window.location.href = "https://stripe.com/in";
          break;

        default:
          toast.error("This payment method is not supported yet.");
          break;
      }

    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const paymentMethods = [
    { id: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
    { id: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
    { id: 'cod', label: 'Cash on Delivery', logo: null },
  ];

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-14 min-h-[80vh]">
      {/* Left Side - Delivery Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First name" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email address" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone" />
      </div>

      {/* Right Side - Cart and Payment */}
      <div className="w-full sm:max-w-[480px] flex flex-col justify-between">
        <CartTotal />

        {/* Payment Section */}
        <div>
          <div className="text-xl sm:text-2xl my-6">
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className="flex gap-3 flex-col lg:flex-row">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition duration-200 ${
                  selectedMethod === method.id ? 'border-green-500 bg-green-50' : ''
                }`}
              >
                <div className="min-w-3.5 h-3.5 border rounded-full flex items-center justify-center">
                  {selectedMethod === method.id && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                </div>
                {method.logo ? (
                  <img className="h-5 mx-4" src={method.logo} alt={method.label} />
                ) : (
                  <span className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</span>
                )}
              </div>
            ))}
          </div>

          {/* Place Order Button */}
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
