import React from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    item: 'Laptop',
    brand: 'Dell',
    modelName: 'XPS 13',
    specifications: '8GB RAM, 256GB SSD',
    condition: 'Good',
    problem: 'Screen flickering',
    status: 'In Progress',
    price: 150,
    createdAt: '2024-09-01T10:30:00Z',
    updatedAt: '2024-09-03T15:45:00Z',
  },
  // More services...
];

const Service = () => {
  return (
    <div className="p-4">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default Service;
