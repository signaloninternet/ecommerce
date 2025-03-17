import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/prioduct-list/Components/ProductList";
import Hero from "./hero/Hero";
import Slider from "./slider/Slider";
import Trending from "./trending/Trending";
import Discount from "./discount/Discount";
import Footer from "./footer/Footer";
import Contact from "./contact/Contact";
import Productlanding from "./productlanding/Productlanding";
import Profile from "./profile page/Profile";
import Form from "./form/Form";

function Home() {
  const navigate = useNavigate();
  

  return (
    <div className="font-sans">
      <div className="font-sans bg-black text-white min-h-screen">
        <NavBar />
        <Hero />
      </div>
      <div id="slider">
        <Slider />
      </div>
      <div id="trending">
        <Trending />
      </div>
      <div id="discount">
        <Discount />
      </div>
      <Footer />
      <div id="contact">
        <Contact />
      </div>
      {/* <Productlanding /> */}
    </div>
  );
}

export default Home;
