import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import NavBar from "../features/navbar/Navbar";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${config.DATABASE_URL}/service/services`,
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

  const handleSuspend = async (serviceId) => {
    // Optimistic UI update
    const updatedServices = services.map((service) =>
      service._id === serviceId
        ? { ...service, status: "Suspended by customer" }
        : service
    );
    setServices(updatedServices);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.DATABASE_URL}/service/suspend/`,
        {
          serviceId: serviceId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Service suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend service");
      // Revert UI change on error
      setServices(services);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <>
      <NavBar></NavBar>
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
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Actions
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        service.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : service.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : service.status === "Suspended by customer"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {service.status}
                    </span>
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
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {service.status !== "Suspended by customer" && (
                      <button
                        onClick={() => handleSuspend(service._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        Suspend
                      </button>
                    )}
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

export default ServicesTable;
