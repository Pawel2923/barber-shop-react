import React, { useEffect } from "react";

import classes from "./Loading.module.css";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const dots = document.querySelectorAll(`.${classes.overlay} p > span`);
    let index = 0;
    const timer = setInterval(() => {
      if (dots[index] !== undefined) {
        dots[index].style.display = "inline";
      } else {
        for (let dot of dots) {
          dot.style.display = "none";
        }
        index = -1;
      }

      index++;
    }, 1000);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <div>
        <p>
          Ładowanie
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
        <i className={`fa-solid fa-spinner ${classes.loading}`}></i>
      </div>
    </div>
  );
};

export default Loading;
