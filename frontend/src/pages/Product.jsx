import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { ProductId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity] = useState(1); // Default quantity
  const [tab, setTab] = useState('description');

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === ProductId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [ProductId, products]);

  const handleAddToCart = () => {
    addToCart(productData._id, size, quantity);
    console.log(`Added ${quantity} of ${productData.name} (Size: ${size}) to cart`);
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product display */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-1'>
            {[1, 2, 3, 4].map((_, i) => (
              <img src={assets.star_icon} alt="" key={i} className="w-4 h-4" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p className="font-medium">Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-black font-semibold' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className='bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition duration-200'
          >
            Add to Cart
          </button>

          {/* Extra info */}
          <div className='mt-6 text-sm text-gray-600'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className='mt-10 border-t pt-6'>
        <div className='flex gap-6 mb-4'>
          <button
            onClick={() => setTab('description')}
            className={`pb-2 border-b-2 ${
              tab === 'description' ? 'border-black font-semibold' : 'border-transparent'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setTab('reviews')}
            className={`pb-2 border-b-2 ${
              tab === 'reviews' ? 'border-black font-semibold' : 'border-transparent'
            }`}
          >
            Reviews ({productData.reviews?.length || 122})
          </button>
        </div>

        <div>
          {tab === 'description' ? (
            <p className='text-gray-600'>
              {productData.fullDescription ||
                'A lightweight, soft knit, pullover shirt. Worn as undershirt or outer garment. Classic round neck with short sleeves.'}
            </p>
          ) : (
            <div className='text-gray-600'>
              {productData.reviews && productData.reviews.length > 0 ? (
                productData.reviews.map((rev, i) => (
                  <p key={i} className='mb-2'>• {rev}</p>
                ))
              ) : (
                <p>No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
