import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <section className='g-wrapper'>
      <div className='paddings innerWidth g-container'>
        <div className='flexColCenter inner-container'>
          <span className='primaryText'>Get Started with Suman Enterprises</span>
          <span className='secondaryText'>Call us to know how can we help you with the styling of your life. We also deal in wholesale, so we are just one step away for your life.</span>
          <span className='secondaryText'>Find your next partner soon</span>
          <button className='glitter-button'>
            <a href='mailto:keshav39@gmail.com'>Get Started</a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Footer