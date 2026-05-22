import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

import StaggeredMenu from "./components/StaggeredMenu";

const socialItems = [
  { label: "Instagram", link: "https://instagram.com" },
  { label: "Whatsapp", link: "https://whatsapp.com" },
];

const menuItems = [
  {
    label: "Home",
    ariaLabel: "Go to home page",
    link: "/",
  },

  {
    label: "About",
    ariaLabel: "Learn about us",
    link: "/about",
  },

  {
    label: "Services",
    ariaLabel: "View our services",
    action: "services",
  },

  {
    label: "Contact",
    ariaLabel: "Get in touch",
    action: "contact",
  },
];

function App() {
  return (
    <Router>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/images/logos/logo.png"
        accentColor="#ff6b6b"
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
export default App;
