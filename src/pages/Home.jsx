import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import CircularGallery from '../components/CircularGallery';
import ServiceStack from '../components/ServiceStack';
import Contact from '../components/Contact.jsx';

import Footer from '../components/Footer.jsx';

import "./Home.css";

const Home = () => {

  const isMobileInitial = window.innerWidth <= 768;

  const [bend, setBend] = useState(
    isMobileInitial ? 0 : 3.2
  );

  const [scrollSpeed, setScrollSpeed] = useState(
    isMobileInitial ? 1 : 2
  );

  const navigate = useNavigate();
const location = useLocation();

const handleContactClick = () => {
  if (location.pathname !== "/") {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }
};

  useEffect(() => {

    const onResize = () => {

      const isMobile = window.innerWidth <= 768;

      setBend(isMobile ? 0 : 3.2);

      setScrollSpeed(isMobile ? 1 : 2);
    };

    window.addEventListener("resize", onResize);

    return () =>
      window.removeEventListener("resize", onResize);

  }, []);

  return (

    <div
      style={{
        fontFamily: "monospace",
        fontSize: "40px",
      }}
    >

      {/* HERO */}
      <div className="hero-works-wrapper">

        <div className="bgGradient"></div>

        <div className="hero">

          <h1>
            We Build <i>Websites</i> That Grow Your
            <i> Business</i> and
            <i> Strengthen</i> Your Brand
            <i> Online</i>.
          </h1>

          <p className="subLine">
            Crafted for brands that care about design and conversion.
          </p>

          <button className="cta" onClick={handleContactClick}>
            CONTACT
          </button>

        </div>

        <div className="works">
  <div
    style={{
      height: '600px',
      position: 'relative'
    }}
  >
    <CircularGallery
      key={`${bend}-${scrollSpeed}`}
      bend={bend}
      scrollSpeed={scrollSpeed}
      textColor="#000"
      borderRadius={0.05}
      scrollEase={0.03}
    />

    {/* ✅ Moved INSIDE the relative container */}
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: 0,
      right: 0,
      textAlign: 'center',
      pointerEvents: 'none',   // so it doesn't block scroll/drag
      zIndex: 10,
    }}>
      <h1 style={{ margin: 0, fontSize: '2.5rem' }}>
        our works
      </h1>
      <p style={{ margin: '4px 0 0' }} className="subLine">
        Modern ecommerce and brand identity websites crafted to stand out.
      </p>
    </div>

  </div>
</div>

      </div>

      {/* SERVICES SECTION */}
      <div id="services">
        <ServiceStack />
      </div>

      {/* CONTACT SECTION */}
      <div id="contact">
        <Contact />
      </div>

      <Footer />

    </div>
  );
};

export default Home;