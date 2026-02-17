import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import Option from "./Option";
import classes from "./MobileNav.module.css";
import logo from "../../../assets/logo.svg";

const portalContainer = document.getElementById("overlays");

export const NavOverlay = (props) => {
  const closeHandler = () => {
    props.closeHandler();
  };

  return (
    <div className={classes.overlay}>
      <nav>
        <div className={classes["close-wrapper"]}>
          <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
          <Link to="/" className={classes["image-wrapper"]}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </Link>
        </div>
        <ul>
          <Option link={{ to: "/", onClick: closeHandler }}>
            Strona główna
          </Option>
          <Option link={{ to: "/products", onClick: closeHandler }}>
            Produkty
          </Option>
          <Option link={{ to: "/appointments", onClick: closeHandler }}>
            Wizyty
          </Option>
          <Option link={{ to: "/contact", onClick: closeHandler }}>
            Kontakt
          </Option>
        </ul>
      </nav>
      <footer className={classes.footer}>
        <p>Barber Shop - projekt w React.js by Paweł Poremba</p>
      </footer>
    </div>
  );
};

const MobileNav = () => {
  const [isOverlayClosed, setIsOverlayClosed] = useState(true);

  const openHandler = () => {
    document.body.style.overflow = "hidden";

    setIsOverlayClosed(false);
  };

  const closeHandler = () => {
    document.body.style.overflow = "initial";

    setIsOverlayClosed(true);
  };

  return (
    <React.Fragment>
      <li>
        <i className="fa-solid fa-bars" onClick={openHandler}></i>
      </li>
      <li>
        <Link to="/" className={classes["image-wrapper"]}>
          <logo />
        </Link>
      </li>
      {!isOverlayClosed &&
        createPortal(
          <NavOverlay closeHandler={closeHandler} />,
          portalContainer
        )}
    </React.Fragment>
  );
};

export default MobileNav;
