import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../features/navbar/NavbarServices";
import config from '../../config'
import { useNavigate } from "react-router-dom";

const ImgBB_UPLOAD_API_KEY = "e93ded634bc86ba972cfcdcee0ded9cc"; // Your ImgBB API key
const BACKEND_API_URL = `${config.DATABASE_URL}/service/services`; // Replace with your backend URL

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: "",
    brand: "",
    modelName: "",
    specifications: "",
    condition: "",
    problem: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFileUpload = async () => {
    if (!formData.image) {
      toast.error("No image selected");
      return null;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("image", formData.image);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formDataToUpload,
        {
          params: {
            key: ImgBB_UPLOAD_API_KEY,
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const imageUrl = await handleFileUpload();
    if (!imageUrl) return;
  
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
  
      // Configure the headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };
  
      await axios.post(BACKEND_API_URL, {
        ...formData,
        image: imageUrl, // Include the image URL in the form data
      }, config);
  
      toast.success("Service added successfully");
      setFormData({
        item: "",
        brand: "",
        modelName: "",
        specifications: "",
        condition: "",
        problem: "",
        price: "",
        image: null,
      });

      navigate("/service-status");
    } catch (error) {
      toast.error("Failed to add service");
    }
  };
  

  return (
    <>
      <NavBar></NavBar>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-5">
        <div className="bg-white shadow-xl rounded-lg max-w-lg w-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Item Field */}
            <div>
              <label
                htmlFor="item"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Item
              </label>
              <input
                type="text"
                id="item"
                name="item"
                value={formData.item}
                onChange={handleChange}
                placeholder="Enter the item name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Brand Field */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter the brand name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Model Name Field */}
            <div>
              <label
                htmlFor="modelName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Model Name
              </label>
              <input
                type="text"
                id="modelName"
                name="modelName"
                value={formData.modelName}
                onChange={handleChange}
                placeholder="Enter the model name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Specifications Field */}
            <div>
              <label
                htmlFor="specifications"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specifications
              </label>
              <input
                type="text"
                id="specifications"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                placeholder="Enter the specifications"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Condition Field */}
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Condition
              </label>
              <input
                type="text"
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Enter the condition"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Problem Field */}
            <div>
              <label
                htmlFor="problem"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Problem
              </label>
              <textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Describe the problem"
                className="w-full border border-gray-300 rounded-md px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              ></textarea>
            </div>
            {/* Price Field */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter the price"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            {/* Image Upload Field */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />{" "}
          {/* Include the ToastContainer to display notifications */}
        </div>
      </section>
    </>
  );
};

export default Form;
