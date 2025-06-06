import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    types: [],
  });
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilterProducts(products);
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [selectedFilters, search, showSearch,products]); // 🆕 Added search and showSearch

  useEffect(() => {
    console.log("Updated Filters - Categories:", selectedFilters.categories);
    console.log("Updated Filters - Types:", selectedFilters.types);
  }, [selectedFilters]);

  const applyFilter = () => {
    if (!products) return;

    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedFilters.categories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedFilters.categories.includes(item.category)
      );
    }

    if (selectedFilters.types.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedFilters.types.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [filterType]: prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value],
      };

      console.log(`Updated ${filterType}:`, newFilters[filterType]);
      return newFilters;
    });
  };

  const handleSort = (e) => {
    const sortType = e.target.value;
    let sortedProducts = [...filterProducts];

    if (sortType === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = [...products];
      applyFilter();
    }

    setFilterProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            className={`h-3 sm:hidden transform ${
              showFilter ? "rotate-90" : "rotate-0"
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {showFilter && (
          <div className="border border-gray-300 pl-5 py-3 mt-6 sm:block">
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={cat}
                    checked={selectedFilters.categories.includes(cat)}
                    onChange={() => handleCheckboxChange("categories", cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        )}

        {showFilter && (
          <div className="border border-gray-300 pl-5 py-3 mt-6 sm:block">
            <p className="mb-3 text-sm font-medium">Types</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={type}
                    checked={selectedFilters.types.includes(type)}
                    onChange={() => handleCheckboxChange("types", type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={" Collection"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={handleSort}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
