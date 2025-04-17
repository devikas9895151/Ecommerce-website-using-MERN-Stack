import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import binIcon from '../assets/bin_icon.png';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, addToCart, removeFromCart, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      setCartData([]); // Clear cart if no items
      return;
    }

    const tempData = [];
    
    Object.keys(cartItems).forEach((itemId) => {
      const product = products.find((p) => p._id === itemId);
      
      if (product) {
        Object.keys(cartItems[itemId]).forEach((size) => {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            tempData.push({ _id: itemId, size, quantity });
          }
        });
      }
    });

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <Title text1="Your" text2="Cart" />

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_1fr] sm:grid-cols-[4fr_2fr_1fr] items-center gap-4"
              >
                {/* Left - Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image?.[0] || "/fallback.png"}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm">
                      {currency}{productData.price}
                    </p>
                  </div>
                </div>

                {/* Middle - Quantity Control */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item._id, item.size)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Right - Delete Icon */}
                <div className="flex justify-end pr-4">
                  <img
                    src={binIcon}
                    alt="Delete"
                    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => removeFromCart(item._id, item.size, true)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        )}
      </div>

      {/* Total Section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button 
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3 disabled:opacity-50"
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
