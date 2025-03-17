import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import NavBar from "../features/navbar/Navbar";
import { Link } from "react-router-dom";

const ServicesTableAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${config.DATABASE_URL}/service/services/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleStatusChange = async (serviceId, newStatus) => {
    const updatedServices = services.map((service) =>
      service._id === serviceId ? { ...service, status: newStatus } : service
    );
    setServices(updatedServices);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.DATABASE_URL}/service/update-status`,
        { serviceId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Service status updated successfully");
    } catch (error) {
      toast.error("Failed to update service status");
      // Revert UI change on error
      setServices(services);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <>
      {/* <NavBar></NavBar> */}
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
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Services Overview
        </h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Specifications
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Condition
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Problem
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.item}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.brand}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.modelName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.specifications}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.condition}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.problem}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.status === "Suspended by customer" ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        {service.status}
                      </span>
                    ) : (
                      <select
                        className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800"
                        value={service.status}
                        onChange={(e) =>
                          handleStatusChange(service._id, e.target.value)
                        }
                      >
                        <option value="Service man going">
                          Service man going
                        </option>
                        <option value="Repairing under process">
                          Repairing under process
                        </option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${service.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(service.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(service.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ServicesTableAdmin;
