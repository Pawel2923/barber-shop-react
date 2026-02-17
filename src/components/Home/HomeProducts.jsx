import { useHistory } from "react-router-dom";

import Button from "../UI/Button/Button";
import classes from "./HomeProducts.module.css";

const HomeProducts = () => {
  const history = useHistory();

  const buttonClickHandler = () => {
    history.push("/products");
  };

  return (
    <section className={classes.products}>
      <h1>Produkty</h1>
      <p>
        W naszym sklepie oferujemy szeroką gamę produktów do pielęgnacji
        zarostu. Gwarantujemy twoje zadowolenie z zakupów.
      </p>
      <div className={classes.button}>
        <p>Katalog produktów</p>
        <Button className={classes.button} onClick={buttonClickHandler}>
          Przeglądaj
        </Button>
      </div>
    </section>
  );
};

export default HomeProducts;
