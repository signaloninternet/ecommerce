import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import axios from 'axios';
import config from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [highlightImages, setHighlightImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [adminName, setAdminName] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.post(
          `${config.DATABASE_URL}/user/get-user`,
          { token }
        );
        setAdminName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post('https://api.imgbb.com/1/upload?key=e93ded634bc86ba972cfcdcee0ded9cc', formData);
      console.log('Image upload response:', response.data);
      return response.data.data.display_url;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const thumbnailUrl = await handleImageUpload(files[0]);
      setThumbnail(thumbnailUrl);

      const highlightFiles = files.slice(1, 5);
      const highlightUrls = await Promise.all(highlightFiles.map(file => handleImageUpload(file)));
      setHighlightImages(highlightUrls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      category,
      price,
      oldPrice,
      thumbnail,
      highlightImages,
      description,
      admin: adminName,
    };

    try {
      await axios.post(`${config.DATABASE_URL}/admin/product`, productData);
      toast.success('Product added successfully'); // Show success toast
      navigate('/admin/product-list'); // Navigate to the product list page
    } catch (error) {
      console.error('Error adding product', error);
      toast.error('Error adding product'); // Show error toast
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Suman Enterprises</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={"/admin"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/admin/add-product"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/admin/users"}>Users</Link>
          </li>
          <li>
            <Link to={"/admin/services"}>Services</Link>
          </li>
          <li>
            <Link to={"/admin/product-list"}>Product List</Link>
          </li>
        </ul>
      </nav>
      <section className="p-4 sm:p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <header className="px-4 py-3 sm:px-5 sm:py-4 bg-blue-500 text-white rounded-t-lg flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">
              <FaClipboardList className="inline mr-2" /> Add a New Product
            </h2>
          </header>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Name:
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter product description"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category:
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter category"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price:
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price Without Discount:
              </label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter price without discount"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Upload Media:
              </h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <div className="mt-4"></div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                <FaShoppingCart className="inline mr-2" /> Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer /> {/* Toast Container for notifications */}
    </>
  );
};

export default AddProduct;
