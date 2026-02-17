import React from "react";

import About from "./HomeAbout";
import Products from "./HomeProducts";
import Services from "./HomeServices";
import Contact from "../UI/Contact/Contact";

const Home = () => {
  return (
    <React.Fragment>
      <About />
      <Products />
      <Services />
      <Contact />
    </React.Fragment>
  );
};

export default Home;
