import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import classes from "./Contact.module.css";

const Contact = (props) => {
  const [showMap, setShowMap] = useState(false);

  const showMapClickHandler = () => {
    if (!showMap) {
      setShowMap(true);
    }
  };

  const hideMapClickHandler = () => {
    if (showMap) {
      setShowMap(false);
    }
  };

  return (
    <section className={props.className}>
      <h1>Skontaktuj się z nami</h1>
      <ul className={classes.list}>
        <li className={classes["list-item"]}>
          <button onClick={showMapClickHandler} title="Pokaż na mapie">
            <i className={`fa-solid fa-location-dot ${classes.icon}`}></i>
            <span>Ulica numer, Miasto</span>
          </button>
        </li>
        <li className={classes["list-item"]}>
          <a title="Wyślij email" href="mailto:barber-shop-react@outlook.com">
            <i className={`fa-solid fa-envelope ${classes.icon}`}></i>
            <span>barber-shop-react@outlook.com</span>
          </a>
        </li>
        <li className={classes["list-item"]}>
          <a title="Zadzwoń" href="tel:+00 123 000 000">
            <i className={`fa-solid fa-phone ${classes.icon}`}></i>
            <span>+00 000 000 000</span>
          </a>
        </li>
        <li className={classes["list-item"]}>
          <div>
            <i className={`fa-solid fa-clock ${classes.icon}`}></i>
            <p>Pon-Pią 9:00 - 19:00</p>
            <p>Sob-Niedz: 10:00 - 20:00</p>
          </div>
        </li>
      </ul>
      {(showMap || (props.showMap !== undefined && props.showMap)) && (
        <div className={classes.map}>
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d228.45653125505163!2d20.694187433606892!3d49.62243740895875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1676970274773!5m2!1spl!2spl"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, width: "100%" }}
            allowFullScreen={true}
          ></iframe>
          {!(props.showMap !== undefined && props.showMap) && (
            <Button onClick={hideMapClickHandler}>Schowaj mapę</Button>
          )}
        </div>
      )}
    </section>
  );
};

export default Contact;
