import React from "react";
import "./hero.css";
import { Link, useNavigate } from "react-router-dom";



const Hero = () => {

  const navigate = useNavigate();

  const handleNavClick = (href) => {
    // setSearchTerm("");
  
    if (href.startsWith("#")) {
      setTimeout(() => {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="hero-left">
          <div className="hero-title">
            <div className="orange-circle"></div>
            <h1>Discover </h1>
            <h1>Most Suitable</h1>
            <h1>Products for your lifestyle</h1>
          </div>

          <div className="hero-des">
            <span className="secondaryText">
              Find a variety of products that suit you very easily.
            </span>
            <span className="secondaryText">
              Forget all those difficulties in finding what suits you more. We
              are future.
            </span>
          </div>

          <div className="hero-button">
            <button onClick={() => handleNavClick("#trending")}>
              Shop Trending
            </button>
            {/* <Link to={"#trending"} >Shop Trending</Link> */}
          </div>
        </div>

        <div className="flexCenter hero-right">
          <div className="image-container">
            <img
              src="https://i.pinimg.com/originals/cc/b8/af/ccb8af7dbba5ece6add032e53ce2de75.jpg"
              alt="pic"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
