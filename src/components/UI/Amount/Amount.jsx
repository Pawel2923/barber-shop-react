import { useState, useEffect } from "react";

import styles from "./Amount.module.css";

const Amount = (props) => {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (props.onAmountChange !== undefined) {
      props.onAmountChange(amount);
    }
  }, [amount, props]);

  useEffect(() => {
    if (props.value !== undefined) {
      setAmount(props.value.amount);
    }
  }, [props]);

  const amountClickHandler = (id) => {
    if (amount > 1 && id === "sub-amount") {
      setAmount(amount - 1);
      if (props.onAmountClick !== undefined && props.value !== undefined) {
        props.onAmountClick(props.value.key, amount - 1);
      }
    }
    if (id === "add-amount") {
      setAmount(amount + 1);
      if (props.onAmountClick !== undefined && props.value !== undefined) {
        props.onAmountClick(props.value.key, amount + 1);
      }
    }
  };

  return (
    <div className={styles.amount}>
      <button onClick={amountClickHandler.bind(null, "sub-amount")}>
        <i className="fa-solid fa-minus"></i>
      </button>
      <div className={styles["amount-value"]}>{amount}</div>
      <button onClick={amountClickHandler.bind(null, "add-amount")}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default Amount;
