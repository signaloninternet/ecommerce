import React from 'react';

const ServiceCard = ({ service }) => {
  const statusColors = {
    'Under Review': 'bg-yellow-400',
    'In Progress': 'bg-blue-400',
    'Completed': 'bg-green-400',
    'Cancelled': 'bg-red-400',
  };

  return (
    <div className="max-w-md mx-auto my-6 p-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{service.item}</h2>
      <p className="text-gray-700 mb-2"><span className="font-bold text-gray-800">Brand:</span> {service.brand}</p>
      <p className="text-gray-700 mb-2"><span className="font-bold text-gray-800">Model:</span> {service.modelName}</p>
      <p className="text-gray-700 mb-2"><span className="font-bold text-gray-800">Specifications:</span> {service.specifications}</p>
      <p className="text-gray-700 mb-2"><span className="font-bold text-gray-800">Condition:</span> {service.condition}</p>
      <p className="text-gray-700 mb-2"><span className="font-bold text-gray-800">Problem:</span> {service.problem}</p>

      <div className="flex justify-between items-center mt-6">
        <span className={`text-sm font-semibold text-white px-4 py-2 rounded-full ${statusColors[service.status]}`}>
          {service.status}
        </span>
        <span className="text-2xl font-bold text-gray-900">${service.price}</span>
      </div>

      <div className="text-right text-gray-500 mt-4">
        <p><span className="font-bold text-gray-700">Created At:</span> {new Date(service.createdAt).toLocaleDateString()}</p>
        <p><span className="font-bold text-gray-700">Last Updated:</span> {new Date(service.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
