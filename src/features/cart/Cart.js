import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import config from "../../config"; // Import config to get DATABASE_URL if needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0); // State for discount
  const [finalTotal, setFinalTotal] = useState(0); // State for final total
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${config.DATABASE_URL}/cart/details`, { token });
        console.log(response.data);
        setCartItems(response.data.cartItems);
        setDiscount(response.data.discount);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = item.productDetails.price;
      return acc + (item.quantity * (isNaN(price) ? 0 : price));
    }, 0);

    // Ensure final total is not negative
    const finalTotal = Math.max(total - discount, 0);

    setSubtotal(total);
    setFinalTotal(finalTotal);
  }, [cartItems, discount]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      
      // Update the quantity on the backend
      await axios.post(`${config.DATABASE_URL}/cart/update-quantity`, {
        token,
        productId,
        quantity: newQuantity
      });
  
      // Update the cart items state with the new quantity
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
  
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };
  

  const handleRemoveProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${config.DATABASE_URL}/cart/remove`, {
        token,
        productId
      });
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="my-5 text-5xl font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((product) => (
              <li
                key={product.productId._id}
                className="flex py-6 transform transition duration-500 hover:-translate-y-1 hover:scale-105"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                  <img
                    alt={product.productDetails.imageAlt || 'Product Image'}
                    src={product.productDetails.thumbnail || 'path/to/default/image.jpg'} // Fallback image
                    onError={(e) => {
                      e.target.src = 'path/to/default/image.jpg'; // Fallback image on error
                    }}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <h3 className="text-xl">
                        <a href={product.productDetails.href} className="hover:underline">
                          {product.productDetails.name}
                        </a>
                      </h3>
                      <p className="ml-4 text-indigo-600">${parseFloat(product.productDetails.price).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-md text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 text-md font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select
                        className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.productId._id, parseInt(e.target.value))}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </p>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.productId._id)}
                        className="font-medium text-red-600 hover:text-red-500 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <p>Subtotal</p>
          <p className="text-indigo-600">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <p>Discount</p>
          <p className="text-red-600">-${discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-semibold text-gray-900">
          <p>Final Total</p>
          <p className="text-indigo-600">${finalTotal.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition duration-300 hover:scale-105"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
              >
                Continue Shopping
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
