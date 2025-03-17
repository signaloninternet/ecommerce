import React, { useEffect } from "react";
import "./App.css";
import ProductList from "./features/prioduct-list/Components/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";

import { createBrowserRouter, RouterProvider, Route, useNavigate } from "react-router-dom";
import AdminPanel from "./pages/adminProduct";
import Profile from "./pages/profile page/Profile";
import Form from "./pages/form/Form";
import ProductLanding from "./pages/productlanding/Productlanding";
import Admin from "./pages/adminpanel/Admin";
import AddProduct from "./pages/adminpanel/Addproduct";
import UsersTable from "./pages/adminpanel/AllUsers";
import ServicesTable from "./pages/ServiceStatus";
import ServicesTableAdmin from "./pages/ServiceStatusAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
  {
    path: "/admin/add-product",
    element: <AddProduct></AddProduct>,
  },
  {
    path: "/admin/users",
    element: <UsersTable></UsersTable>,
  },
  {
    path: "/admin/product-list",
    element: <AdminPanel></AdminPanel>,
  },
  {
    path: "/admin/services",
    element: <ServicesTableAdmin></ServicesTableAdmin>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/service",
    element: <Form></Form>,
  },
  {
    path: "/productlanding",
    element: <ProductLanding></ProductLanding>,
  },
  {
    path: "/service-status",
    element: <ServicesTable></ServicesTable>
  },
]);

function App() {
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
