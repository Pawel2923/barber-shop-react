import { useHistory } from "react-router-dom";

import Button from "../UI/Button/Button";
import classes from "./HomeAbout.module.css";

const HomeAbout = () => {
  const history = useHistory();

  const buttonClickHandler = () => {
    history.push("/appointments");
  };

  return (
    <section className={classes.about}>
      <div className={classes.top}>
        <h1>O nas</h1>
        <h3>
          Salon barberski Barber Shop to miejsce które powstało z myślą o Twoim
          zaroście. Nasz zespół tworzą zgrani i doświadczeni styliści, którzy
          cały czas podnoszą swoje kwalifikacje zawodowe. Kompleksowo zadbają o
          każdy włos, aby spełnić wszystkie oczekiwania.
        </h3>
      </div>
      <div className={`${classes.bottom}`}>
        <div className={classes.left}>
          <h3>Już teraz skorzystaj z naszej oferty</h3>
        </div>
        <div className={classes.right}>
          <Button type="button" onClick={buttonClickHandler}>
            Umów wizytę
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
