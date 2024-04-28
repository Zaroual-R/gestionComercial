import React from 'react';
import './Footer.css'; // Assurez-vous d'avoir un fichier Footer.css dans le même dossier
import SocialMediaIcons from './SocialMediaIcons';
const FooterHome = () => {
  return (
    <footer className="footerHome">
    <div className="ffff">
      <div className="footer-section">
        <h2>SEOTECH</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
      <div className="footer-section">
        <h2>BASIC LINKS</h2>
        <ul>
        <li><a href="/" className="footer-link">Home (current)</a></li>
        <li><a href="/about" className="footer-link">About</a></li>
        <li><a href="/services" className="footer-link">Services</a></li>
        <li><a href="/contact" className="footer-link">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h2>CONTACT DETAILS</h2>
        <p>+01 1234567890</p>
        <p>demo@gmail.com</p>
      </div>
      <div className="footer-section">
        <h2>NEWSLETTER</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
        <SocialMediaIcons />

      </div>
      </div>   
        <div class="container-fluidn  footer_section">
            <div class="container">
                <p>
                &copy; <span id="displayYear"></span> All Rights Reserved By
                <a href="https://html.design/">Free Html Templates</a>
                </p>
            </div>
        </div>

    </footer>
  );
};

export default FooterHome;
