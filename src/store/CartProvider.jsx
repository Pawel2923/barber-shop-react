import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let oldItems = state.items;
    if (!(oldItems.length > 0) && localStorage.getItem("cart") !== null) {
      const cartLocal = JSON.parse(localStorage.getItem("cart"));

      oldItems = cartLocal;
    }

    const existingIndex = oldItems.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems;

    if (existingIndex !== -1) {
      const existingItem = oldItems[existingIndex];

      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...oldItems];
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems = oldItems.concat({ ...action.item });
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return {
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE") {
    let updatedItems = state.items.filter((item) => item.id !== action.item.id);

    if (!(state.items > 0) && localStorage.getItem("cart") !== null) {
      const cartLocal = JSON.parse(localStorage.getItem("cart"));

      updatedItems = cartLocal.filter((item) => item.id !== action.item.id);
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return {
      items: updatedItems,
    };
  }

  if (action.type === "CHANGE_AMOUNT") {
    let oldItems = state.items;
    if (!(oldItems.length > 0) && localStorage.getItem("cart") !== null) {
      const cartLocal = JSON.parse(localStorage.getItem("cart"));

      oldItems = cartLocal;
    }

    const targetId = oldItems.findIndex((item) => item.id === action.item.id);

    if (targetId !== -1) {
      const target = oldItems[targetId];

      const updatedItem = {
        ...target,
        amount: action.item.amount,
      };

      let updatedItems = [...oldItems];
      updatedItems[targetId] = updatedItem;

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return {
        items: updatedItems,
      };
    }

    return state;
  }

  if (localStorage.getItem("cart") !== null) {
    localStorage.removeItem("cart");
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (id, amount) => {
    dispatchCartState({ type: "ADD", item: { id: id, amount: amount } });
  };

  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE", item: { id: id } });
  };

  const changeAmountHandler = (id, amount) => {
    dispatchCartState({
      type: "CHANGE_AMOUNT",
      item: { id: id, amount: amount },
    });
  };

  const resetItemsHandler = () => {
    dispatchCartState({ type: "RESET" });
  };

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        changeAmount: changeAmountHandler,
        resetItems: resetItemsHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
