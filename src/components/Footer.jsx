import React from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">

      {/* LEFT — Brand */}
      <div className="footer-brand">
        <p className="footer-cta">Let's talk</p>
        <img
          className="footer-logo"
          src="/images/logos/web_atomic_logo.webp"
          alt="Web Atomic Logo"
        />
      </div>

      {/* RIGHT — Info columns */}
      <div className="footer-info">

        <div className="footer-col">
          <span className="footer-col-label">Contact</span>
          <a href="tel:123456789" className="footer-col-value">9552931095</a>
          <nav className="footer-nav">
            <p className="footer-nav-heading">Go to</p>
            <Link to="/">/Home</Link>
            <button onClick={() => scrollTo("contact")}>/Contact</button>
            <Link to="/about">/About</Link>
            <button onClick={() => scrollTo("services")}>/Services</button>
          </nav>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Email us</span>
          <a href="mailto:webatomiclab@gmail.com" className="footer-col-value">webatomiclab@gmail.com</a>
          <nav className="footer-nav">
            <p className="footer-nav-heading">Stay updated with our latest work.</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">/Instagram</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">/WhatsApp</a>
          </nav>
        </div>

      </div>

    </footer>
  );
};

export default Footer;