import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { StarIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import config from "../../../config"; // Import config to get DATABASE_URL if needed
import { ToastContainer, toast } from 'react-toastify'; // Import toastify functions
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const { id } = useParams(); // Get the productId from the URL params
  const productId = id;
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(productId);
        const response = await axios.post(`${config.DATABASE_URL}/user/product`, { id: productId });
        console.log(response);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        return toast.error('User not authenticated');
      }

      const response = await axios.post(`${config.DATABASE_URL}/cart/add`, {
        token,
        productId,
        quantity // Include quantity in the request body
      });

      toast.success('Product added to cart'); // Show success popup
    } catch (err) {
      toast.error('Failed to add product to cart'); // Show error popup
      console.log(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="bg-white p-6 max-w-5xl mx-auto animate-fade-in">
      {/* Custom Cursor */}
      <style>
        {`
        body {
          cursor: url('https://example.com/custom-cursor.png'), auto;
        }
        button, .cursor-pointer {
          cursor: pointer;
        }
        `}
      </style>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 animate-slide-in-left">
          {product.name}
        </h1>
        <HeartIcon className="h-7 w-7 text-red-500 cursor-pointer hover:scale-125 transition-transform duration-300" />
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
        {/* Image */}
        <div className="w-full md:w-1/2">
          {product.thumbnail ? (
            <img
              alt={product.thumbnail}
              src={product.thumbnail}
              className="rounded-lg w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div>No image available</div> // Fallback content if image is not available
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
          <div>
            <p className="text-3xl font-semibold text-gray-900 animate-slide-in-right">₹{product.price}</p>

            {/* Ratings */}
            <div className="flex items-center mt-4">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    // Add condition if you have product.reviews.average
                    // product.reviews.average > rating ? 'text-yellow-500' : 'text-gray-300',
                    'h-5 w-5'
                  )}
                  aria-hidden="true"
                />
              ))}
              {/* <span className="ml-2 text-gray-600">{product.reviews.totalCount} reviews</span> */}
            </div>

            {/* Colors */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              {/* Add color options here if available */}
            </div>

            {/* Sizes */}
            {/* <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <RadioGroup
                value={selectedSize}
                onChange={setSelectedSize}
                className="mt-2 grid grid-cols-4 gap-2"
              >
                {product.sizes.map((size) => (
                  <RadioGroup.Option
                    key={size.name}
                    value={size}
                    className={classNames(
                      size.inStock
                        ? 'cursor-pointer bg-white text-gray-900 hover:bg-gray-100'
                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                      'py-2 px-4 text-center rounded-md border transform transition-transform hover:scale-110'
                    )}
                  >
                    <span>{size.name}</span>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div> */}

            <p className="mt-6 text-gray-600 animate-fade-in">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-900">Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              onClick={addToCart} // Attach the click handler
              className="bg-orange-500 text-white w-full py-3 rounded-md text-lg font-medium hover:bg-orange-600 transform hover:scale-105 transition-transform duration-300 animate-bounce"
            >
              <ShoppingBagIcon className="h-6 w-6 inline-block mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
