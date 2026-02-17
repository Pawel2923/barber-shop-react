import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import Amount from "../UI/Amount/Amount";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Ratings from "./Ratings";
import classes from "./ProductDetail.module.css";
import CartContext from "../../store/cart-context";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/Loading/Loading";
import { getImageUrl } from "../../utils/product-images";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

const findProduct = (productId, productsData) => {
  for (const product of productsData) {
    if (product.id === productId) {
      return { ...product, isFound: true };
    }
  }
  return { isFound: false };
};

const defaultModalState = {
  show: false,
  error: false,
  title: "",
  message: "",
};

const ProductDetail = () => {
  const { productId } = useParams();
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  const [targetItem, setTargetItem] = useState([]);
  const { sendRequest, isLoading, error, result } = useHttp();

  useEffect(() => {
    sendRequest(requestConfig);
  }, [sendRequest]);

  const [amount, setAmount] = useState(1);
  const [modalState, setModalState] = useState(defaultModalState);

  useEffect(() => {
    if (error) {
      setModalState({
        show: true,
        error: true,
        title: "Wystapił Błąd",
        message: (
          <div>
            <p>Błąd połączenia z bazą danych</p>
            <details>
              <summary>Więcej informacji</summary>
              <p>{error}</p>
            </details>
          </div>
        ),
      });
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      setTargetItem(findProduct(productId, result));
    }
  }, [result, productId]);

  const amountChangeHandler = (number) => {
    setAmount(number);
  };

  const messageCloseHandler = () => {
    setModalState(defaultModalState);
  };

  const messageBtnClickHandler = () => {
    history.push("/cart");
  };

  const addToCartMessage = (
    <React.Fragment>
      <p>Produkt został dodany do koszyka.</p>
      <Button
        onClick={messageBtnClickHandler}
        className={classes["message-button"]}
      >
        Przejdź do koszyka
      </Button>
    </React.Fragment>
  );

  const buttonClickHandler = () => {
    cartCtx.addItem(productId, amount);

    setModalState({
      show: true,
      error: false,
      title: "Dodano do koszyka",
      message: addToCartMessage,
    });
  };

  const price =
    parseFloat(targetItem.price).toFixed(2).toString().replace(/\./g, ",") +
    "zł";

  return (
    <section className={classes["products"]}>
      <nav>
        <ul>
          <li>
            <Link to="/products">
              <i className="fa-solid fa-circle-arrow-left"></i> Wróć
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.description}>
        {targetItem.isFound && !isLoading ? (
          <React.Fragment>
            <div className={classes["image-wrapper"]}>
              <h1>{targetItem.title}</h1>
              <img
                src={getImageUrl(targetItem.imagePath)}
                className={classes.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={classes.right}>
              <div>{price}</div>
              <Ratings score={parseInt(targetItem.score)} />
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
            <div className={classes.bottom}>
              <h1>Opis produktu</h1>
              {targetItem.description}
            </div>
          </React.Fragment>
        ) : (
          !isLoading && <h1>Taki produkt nie istnieje</h1>
        )}
      </div>
      {isLoading && <Loading />}
      {modalState.show && (
        <Modal
          modalInfo={{
            ...modalState,
            onClose: messageCloseHandler,
          }}
        />
      )}
      <br />
    </section>
  );
};

export default ProductDetail;
