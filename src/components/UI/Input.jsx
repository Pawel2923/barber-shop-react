import React, { useState } from "react";

const checkValidity = (type, value) => {
  if (type === "text" || type === "textarea") {
    if (value.trim() !== "" && value.trim().length >= 3) {
      return true;
    } else {
      return false;
    }
  }

  if (type === "email") {
    if (value.trim() !== "") {
      if (value.includes("@")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (type === "tel") {
    if (value.trim() !== "") {
      const re1 = /[0-9]{9}/g;
      const re2 = /[0-9]{3} [0-9]{3} [0-9]{3}/g;
      const re3 = /[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}/g;

      if (re1.test(value) || re2.test(value) || re3.test(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  console.error(
    "Funkcja checkValidity potrzebuje prawidłowego paremetru type do poprawnego działania."
  );
  return false;
};

const findIndex = (targetId) => {
  let index = -1;

  if (targetId === "name") {
    index = 0;
  }
  if (targetId === "email") {
    index = 1;
  }
  if (targetId === "phoneNumber") {
    index = 2;
  }
  if (targetId === "message") {
    index = 3;
  }

  return index;
};

const Input = (props) => {
  const [showText, setShowText] = useState(false);
  const { isTextarea, attributes } = props;

  const inputBlurHandler = (ev) => {
    if (!checkValidity(ev.target.type, ev.target.value)) {
      ev.target.classList.add("invalid");
      setShowText(true);
      props.onValidate(false, findIndex(ev.target.id));
    } else {
      ev.target.classList.remove("invalid");
      setShowText(false);
      props.onValidate(true, findIndex(ev.target.id));
    }
  };

  const inputChangeHandler = (ev) => {
    props.onChange(ev, attributes.id);

    setShowText(false);
    ev.target.classList.remove("invalid");
    if (checkValidity(ev.target.type, ev.target.value)) {
      
      props.onValidate(true, findIndex(ev.target.id));
    } else {
      props.onValidate(false, findIndex(ev.target.id));
    }
  };

  return (
    <React.Fragment>
      {isTextarea && (
        <textarea
          {...attributes}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        ></textarea>
      )}
      {!isTextarea && (
        <input
          {...attributes}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
        />
      )}
      {showText && <div className="invalid">Poprawnie wypełnij to pole</div>}
    </React.Fragment>
  );
};

export default Input;
