import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./admin.css";
import { FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '../../config'

const Admin = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        // Fetch the summary data from the backend
        const response = await axios.get(`${config.DATABASE_URL}/admin/summary`);

        // Update the state with the fetched data
        setTotalProducts(response.data.products);
        setTotalCustomers(response.data.users);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Suman Enterprises</h1>
        </div>
        <ul className="nav-links">
          <li><Link to={"/admin"} >Dashboard</Link></li>
          <li><Link to={"/admin/add-product"}>Add Product</Link></li>
          <li><Link to={"/admin/users"}>Users</Link></li>
          <li><Link to={"/admin/services"}>Services</Link></li>
          <li><Link to={"/admin/product-list"}>Product List</Link></li>
        </ul>
      </nav>
      <section className='dashboard'>
        <div className='title'>
          <p>Summary</p>
        </div>
        <div className='summary'>
          <div className='card'>
            <div className='icon'><FaBox /></div>
            <div className='text'>
              <p>Total Products</p>
              <h3>{totalProducts} amount</h3>
            </div>
          </div>
          <div className='card'>
            <div className='icon'><FaUsers /></div>
            <div className='text'>
              <p>Total No of Customers</p>
              <h3>{totalCustomers} amount</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;
