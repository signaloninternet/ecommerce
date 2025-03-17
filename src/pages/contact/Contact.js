import React from 'react';
import './contact.css';
import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';
import { SiWhatsapp } from 'react-icons/si'; // Importing WhatsApp icon

const Contact = () => {
  const phoneNumber = "+916297683680";
  const mailtoLink = "mailto:your-email@example.com"; // Replace with your email address
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <section className='c-wrapper'>
      <div className='paddings innerWidth flexCenter c-container'>
        {/* Left Section */}
        <div className='flexColStart c-left'>
          <span className='orangeText'>Our Contact Us</span>
          <span className='primaryText'>Easy to contact us</span>
          <span className='secondaryText'>
            We always ready to help by providing the best services for you. We believe a good place to live can make your life better.
          </span>

          <div className='grid contactModes'>
            {/* Call Option */}
            <div className='flexStart mode'>
              <div className='flexCenter icon'>
                <MdCall size={25} />
              </div>
              <div className='flexColStart detail'>
                <span className='primaryText'>Call</span>
                <span className='secondaryText'>{phoneNumber}</span>
                <a href={`tel:${phoneNumber}`} className="flexCenter button">Call now</a>
              </div>
            </div>

            {/* Mail Option */}
            <div className='flexStart mode'>
              <div className='flexCenter icon'>
                <BsFillChatDotsFill size={25} />
              </div>
              <div className='flexColStart detail'>
                <span className='primaryText'>Mail</span>
                <span className='secondaryText'>your-email@example.com</span>
                <a href={mailtoLink} className="flexCenter button">Mail now</a>
              </div>
            </div>

            {/* Message Option */}
            <div className='flexStart mode'>
              <div className='flexCenter icon'>
                <HiChatBubbleBottomCenter size={25} />
              </div>
              <div className='flexColStart detail'>
                <span className='primaryText'>Message</span>
                <span className='secondaryText'>{phoneNumber}</span>
                <a href={`sms:${phoneNumber}`} className="flexCenter button">Message now</a>
              </div>
            </div>

            {/* WhatsApp Option */}
            <div className='flexStart mode'>
              <div className='flexCenter icon'>
                <SiWhatsapp size={25} />
              </div>
              <div className='flexColStart detail'>
                <span className='primaryText'>WhatsApp</span>
                <span className='secondaryText'>{phoneNumber}</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flexCenter button">WhatsApp now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='c-right'>
          <div className='image-container'>
            <img src='https://i.pinimg.com/originals/45/44/c1/4544c1e0a86d595dc25907ace4e33a71.png' alt='Modern House' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
