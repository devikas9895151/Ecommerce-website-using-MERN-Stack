import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]); // Ensure `list` is always an array

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      console.log("API Response:", response.data); // Debugging

      if (response.data && response.data.success && Array.isArray(response.data.product)) {
        setList(response.data.product); // ✅ Corrected: "product" instead of "products"
      } else {
        setList([]); // Ensure list is always an array
        toast.error(response.data?.message || "No products found.");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      setList([]); // Prevent crash if API call fails
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } } // Ensure token is included correctly
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the product list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchList();
    }
  }, [token]); // Added `token` as a dependency

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id} // Use `_id` as key
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border gap-2 py-1 px-2 text-sm"
            >
              {/* Ensure `image` exists before accessing `image[0]` */}
              <img
                src={item.image?.[0] || "/placeholder.png"}
                alt={item.name}
                className="w-12 h-12 object-cover"
              />
              <p>{item.name}</p>
              <p>{item.category || "N/A"}</p> {/* Ensure category is not undefined */}
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-center cursor-pointer text-red-500 font-bold"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>
    </>
  );
};

export default List;
