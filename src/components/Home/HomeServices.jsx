import trim from "../../assets/home-img/trim.webp";
import haircut from "../../assets/home-img/haircut.webp";
import procedure from "../../assets/home-img/procedure.webp";
import barber from "../../assets/home-img/barber.webp";
import products from "../../assets/home-img/products.webp";
import classes from "./HomeServices.module.css";

const HomeServices = (props) => {
  return (
    <section className={classes.services}>
      <h1>Nasze usługi</h1>
      <ul>
        <li>
          <img
            src={trim}
            alt="Zarost zdjęcie"
            className={classes.image}
            width="100%"
            height="auto"
          />
          <div className={classes["service-description"]}>
            <h3>Strzyżenie i modelowanie brody</h3>
            <br />
            <p>
              Strzyżenie i modelowanie brody w naszym to salonie to najlepszy
              wybór, aby zadbać o swoją brodę.
            </p>
          </div>
        </li>
        <li>
          <div className={classes["service-description"]}>
            <h3>Strzyżenie i stylizowanie fryzury</h3>
            <br />
            <p>
              Każdego klienta traktujemy indywidualnie, pomagamy dobrać fryzurę
              w zależności od typu urody, rodzajów włosów oraz panujących
              trendów.
            </p>
          </div>
          <img
            src={haircut}
            alt="Fryzura zdjęcie"
            className={classes.image}
            width="100%"
            height="auto"
          />
        </li>
        <li>
          <img
            src={procedure}
            alt="Zabiegi zdjęcie"
            className={classes.image}
            width="100%"
            height="auto"
          />
          <div className={classes["service-description"]}>
            <h3>Zabiegi pielęgnacyjne</h3>
            <br />
            <p>
              Pielęgnacja zarostu jest bardzo ważna dla zachowania
              nieskazitelnego wyglądu.
            </p>
          </div>
        </li>
        <li>
          <div className={classes["service-description"]}>
            <h3>Doradztwo w zakresie pielęgnacji i stylizacji zarostu</h3>
            <br />
            <p>
              Masz kilka pytań? Nasi pracownicy pełni wiedzy odpowiedzą na nie.
            </p>
          </div>
          <img
            src={barber}
            alt="Doradztwo zdjęcie"
            className={classes.image}
            width="100%"
            height="auto"
          />
        </li>
        <li>
          <img
            src={products}
            alt="Produkty zdjęcie"
            className={classes.image}
            width="100%"
            height="auto"
          />
          <div className={classes["service-description"]}>
            <h3>Produkty pielęgnacyjne</h3>
            <br />
            <p>Zakup potrzebne produkty do pielęgnacji twojej brody w domu.</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default HomeServices;
