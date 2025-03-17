import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Import DATABASE_URL
import NavbarAdmin from "../features/navbar/NavbarAdmin";

const initialProductState = {
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  thumbnail: "",
  highlightImages: "",
  description: "",
};

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(initialProductState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const { data } = await axios.post(
          `${config.DATABASE_URL}/user/get-user`,
          { token }
        );
        
        if (data.userRole === "admin" || data.userRole === "superAdmin") {
          setUser(data);
          fetchProducts();
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${config.DATABASE_URL}/user/productsAdmin`);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...productForm,
        admin: user.name,
        isApproved: false,
      };

      await axios.post(`${config.DATABASE_URL}/admin/product`, productData);
      fetchProducts();
      setIsModalOpen(false);
      setProductForm(initialProductState);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleProductRemove = async (id) => {
    // Create a copy of the products list with the product removed
    const previousProducts = [...products];
    const updatedProducts = products.filter((product) => product._id !== id);
  
    // Optimistically update the UI
    setProducts(updatedProducts);
  
    try {
      // Make the backend request to delete the product
      await axios.delete(`${config.DATABASE_URL}/admin/product/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
  
      // Revert the optimistic update if the request fails
      setProducts(previousProducts);
    }
  };
  
  const handleToggleApproval = async (product) => {
    // Create a copy of the product with the updated approval status
    const updatedProduct = { ...product, isApproved: !product.isApproved };
  
    // Optimistically update the UI
    const previousProducts = [...products];
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p._id === product._id ? updatedProduct : p))
    );
  
    try {
      // Make the backend request to toggle approval
      await axios.put(
        `${config.DATABASE_URL}/admin/toggle-product-approval`,
        {
          token: localStorage.getItem("token"),
          productId: product._id,
        }
      );
    } catch (error) {
      console.error("Error toggling approval:", error);
  
      // Revert the optimistic update if the request fails
      setProducts(previousProducts);
    }
  };
  

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="admin-panel bg-gray-100 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Admin Panel
        </h1>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Search Products"
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to={"/admin/add-product"}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Add Product
          </Link>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add Product
              </h2>
              <form onSubmit={handleProductSubmit}>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm({ ...productForm, category: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Old Price"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.oldPrice}
                  onChange={(e) =>
                    setProductForm({ ...productForm, oldPrice: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.thumbnail}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      thumbnail: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Highlight Images URLs (comma-separated)"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.highlightImages}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      highlightImages: e.target.value,
                    })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Image</th>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Price</th>
              <th className="py-3 px-5 text-left">Admin</th>
              <th className="py-3 px-5 text-left">Is Approved</th>
              {user?.userRole === "superAdmin" && (
                <>
                  <th className="py-3 px-5 text-left">Actions</th>
                  <th className="py-3 px-5 text-left">Remove</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-5">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-5 text-gray-800">{product.name}</td>
                <td className="py-3 px-5 text-gray-800">${product.price}</td>
                <td className="py-3 px-5 text-gray-800">{product.admin}</td>
                <td
                  className={`py-3 px-5 font-semibold ${
                    product.isApproved ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.isApproved ? "Approved" : "Not Approved"}
                </td>
                {user?.userRole === "superAdmin" && (
                  <>
                    <td className="py-3 px-5">
                      <button
                        onClick={() => handleToggleApproval(product)}
                        className={`px-4 py-2 rounded-lg ${
                          product.isApproved
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {product.isApproved ? "Unapprove" : "Approve"}
                      </button>
                    </td>
                    <td className="py-3 px-5">
                      <button
                        onClick={() => handleProductRemove(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPanel;
