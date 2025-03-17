import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import "swiper/css";
import './trending.css';
import { sliderSettings } from '../../utils/common';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Trending = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Mock local products with images from Unsplash
    const localProducts = [
      { _id: '1', name: 'Product 1', price: '19.99', description: 'Great product', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
      { _id: '2', name: 'Product 2', price: '29.99', description: 'Another great product', thumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { _id: '3', name: 'Product 3', price: '15.99', description: 'Awesome product', thumbnail: 'https://plus.unsplash.com/premium_photo-1686917213124-bd0a3d57ea9b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '4', name: 'Product 4', price: '25.99', description: 'Amazing product', thumbnail: 'https://images.unsplash.com/photo-1653920555674-b4a73ff71eb2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '5', name: 'Product 5', price: '99.99', description: 'Luxury product', thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '6', name: 'Product 6', price: '39.99', description: 'Premium product', thumbnail: 'https://images.unsplash.com/photo-1631215062235-c1df09b3b27a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '7', name: 'Product 7', price: '49.99', description: 'High quality product', thumbnail: 'https://images.unsplash.com/photo-1640890959827-6307611b34a1?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '8', name: 'Product 8', price: '59.99', description: 'Top-tier product', thumbnail: 'https://images.unsplash.com/photo-1579468228035-f05790a086de?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '9', name: 'Product 9', price: '69.99', description: 'Best value product', thumbnail: 'https://images.unsplash.com/photo-1631215062053-ea8c29b318ec?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { _id: '10', name: 'Product 10', price: '89.99', description: 'Exclusive product', thumbnail: 'https://images.unsplash.com/photo-1623082185968-93f2ab57818b?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ];

    setProducts(localProducts); // Set the local product data
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // Redirect to the product details page
  };

  return (
    <section className='r-wrapper'>
      <div className='paddings innerWidth r-container'>
        <div className='r-head'>
          <span className='orangeText'>Just Launched</span>
          <span className='primaryText'>Trending Items</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className='r-card' onClick={() => handleProductClick(product._id)}>
                <img src={product.thumbnail} alt={product.name} />
                <span className='secondaryText r-price'>
                  <span style={{ color: 'orange' }}>$ </span>
                  <span>{product.price}</span>
                </span>
                <span className='primaryText r-name'>{product.name}</span>
                <span className='secondaryText r-detail'>{product.description}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Trending;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
