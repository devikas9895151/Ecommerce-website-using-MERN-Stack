import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "\u20B9";
  const delivery_fee = 10;
  
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1005";

  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size!", { position: "top-center", autoClose: 3000, theme: "colored" });
      return;
    }

    setCartItems(prevCart => {
      const newCart = { ...prevCart };
      newCart[itemId] = { ...newCart[itemId], [size]: (newCart[itemId]?.[size] || 0) + 1 };
      return newCart;
    });

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`, 
          { itemId, size }, 
          { headers: { Authorization: `Bearer ${token}` } } 
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(error.response?.data?.message || "Failed to add item to cart");
      }
    }

    toast.success("Item added to cart!", { position: "top-right", autoClose: 2000, theme: "colored" });
  };

  const removeFromCart = (itemId, size, removeAll = false) => {
    setCartItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (!updatedItems[itemId]) return prevItems;

      if (removeAll || updatedItems[itemId][size] <= 1) {
        delete updatedItems[itemId][size];
        if (Object.keys(updatedItems[itemId]).length === 0) {
          delete updatedItems[itemId];
        }
      } else {
        updatedItems[itemId][size] -= 1;
      }

      return updatedItems;
    });

    toast.info("Item removed from cart", { position: "top-right", autoClose: 2000, theme: "colored" });
  };

  const logout = () => {
    setToken('');
    setCartItems({});
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');

    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0);
  };

  const getCartAmount = () => {
    const productMap = new Map(products.map(p => [p._id, p.price]));
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      return total + (productMap.get(itemId) || 0) * Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data?.success) {
        setProducts(response.data.product || []);
      } else {
        toast.error(response.data?.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // 
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data?.message || "Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart. Please try again.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const bestSellers = products.filter(product => product.bestseller);

  const value = {
    products,
    bestSellers,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount,
    setCartItems,
    navigate,
    backendUrl,
    setToken,
    token,
    logout
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
