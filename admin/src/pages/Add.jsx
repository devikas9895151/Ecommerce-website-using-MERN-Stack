import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newFiles = [...imageFiles];
      
      newImages[index] = URL.createObjectURL(file);
      newFiles[index] = file; // Store actual file for upload
  
      setImages(newImages);
      setImageFiles(newFiles);
    }
  };
  

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newFiles = [...imageFiles];
    newImages[index] = false;
    newFiles[index] = null;
    setImages(newImages);
    setImageFiles(newFiles);
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const resetForm = () => {
    setImages([false, false, false, false]);
    setImageFiles([null, null, null, null]);
    setSelectedSizes([]);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Men");
    setSubCategory("Topwear");
    setBestseller(false);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller.toString());
      formData.append("sizes", JSON.stringify(selectedSizes));
  
      imageFiles.forEach((file, index) => {
        if (file) formData.append(`image${index + 1}`, file);
      });
  
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
  
      console.log("✅ Product added successfully:", response.data);
    } catch (error) {
      console.error("❌ Error uploading product:", error);
      toast.error(error.message);
    }
  
    setIsSubmitting(false);
  };
  

  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 p-5'>
      {/* Upload Images */}
      <div>
        <p className='mb-2 text-lg font-medium'>Upload Images</p>
        <div className='flex gap-4'>
          {images.map((img, index) => (
            <div key={index} className='relative'>
              <label htmlFor={`image${index}`}>
                <img
                  className='w-24 h-24 object-cover border rounded cursor-pointer'
                  src={img || assets.upload_area}
                  alt={`upload-${index}`}
                />
              </label>
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
              {img && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-2'>Product name</p>
        <input
          className='w-full px-3 py-2 border rounded'
          type="text"
          placeholder='Type here'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-2'>Product description</p>
        <textarea
          className='w-full px-3 py-2 border rounded resize-none'
          placeholder='Write content here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category & Subcategory */}
      <div className='flex flex-wrap gap-4 w-full max-w-[500px]'>
        <div className='flex-1'>
          <p className='mb-2'>Product category</p>
          <select
            className='w-full px-3 py-2 border rounded'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className='flex-1'>
          <p className='mb-2'>Sub category</p>
          <select
            className='w-full px-3 py-2 border rounded'
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className='flex-1'>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 border rounded'
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-2 flex-wrap'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              type="button"
              key={size}
              className={`px-3 py-1 border rounded ${selectedSizes.includes(size) ? 'bg-pink-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {/* Best Seller Checkbox */}
<div className='w-full max-w-[500px] flex items-center gap-2'>
  <input
    type="checkbox"
    id="bestseller"
    className='w-5 h-5'
    checked={bestseller}
    onChange={(e) => setBestseller(e.target.checked)}
  />
  <label htmlFor="bestseller" className='text-lg'>Best Seller</label>
</div>


      {/* Submit */}
      <button
        type="submit"
        className='mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50'
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
