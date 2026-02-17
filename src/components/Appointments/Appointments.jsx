import React, { useState, useEffect } from "react";

import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Loading from "../UI/Loading/Loading";
import Input from "../UI/Input";
import classes from "./Appointments.module.css";
import useEmail from "../../hooks/use-email";

const defaultModalState = {
  show: false,
  error: false,
  title: "",
  message: "",
};

const phoneNumberPattern =
  "[0-9]{3} [0-9]{3} [0-9]{3}|[0-9]{3}[0-9]{3}[0-9]{3}|[0-9]{3}-[0-9]{3}-[0-9]{3}";

const Appointments = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const { isLoading, modalState: emailModalState, sendEmail } = useEmail();

  const [modalState, setModalState] = useState(defaultModalState);
  const [isInputValid, setIsInputValid] = useState(new Array(4).fill(false));

  useEffect(() => {
    if (emailModalState) {
      setModalState(emailModalState);
    }
  }, [emailModalState]);

  const inputChangeHandler = (ev, inputId) => {
    if (inputId === "name") {
      setName(ev.target.value);
    }
    if (inputId === "email") {
      setEmail(ev.target.value);
    }
    if (inputId === "phoneNumber") {
      setPhoneNumber(ev.target.value);
    }
    if (inputId === "message") {
      setMessage(ev.target.value);
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    let isValid = false;

    const falseIndex = isInputValid.findIndex((val) => val === false);
    if (falseIndex === -1) {
      isValid = true;
    }

    if (isValid) {
      sendEmail({
        name,
        email,
        phoneNumber,
        message,
      });
    } else {
      setModalState({
        show: true,
        error: true,
        title: `Wypełnij formularz`,
        message: "Sprawdź czy poprawnie wypełniłeś wszystkie pola formularza.",
      });
      return;
    }

    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setIsInputValid(new Array(4).fill(false));
  };

  const modalCloseHandler = () => {
    setModalState(defaultModalState);
  };

  const inputValidateHandler = (isValid, index) => {
    if (index !== -1) {
      setIsInputValid((prevState) => {
        let updatedState = prevState;
        updatedState[index] = isValid;
        return updatedState;
      });
      return;
    }
    setIsInputValid(new Array(4).fill(false));
  };

  return (
    <React.Fragment>
      <section className={classes.appointments}>
        <h1>Umów się na wizytę</h1>
        <h3>
          <span>Wyślij wiadomość lub zadzwoń na </span>
          <a title="Zadzwoń" href="tel:+00 123 000 000">
            +00 123 000 000
          </a>
        </h3>
        <form onSubmit={submitHandler}>
          <label className={classes.name}>
            <p>
              Imię i nazwisko <span className={classes.asterisk}>*</span>
            </p>
            <Input
              attributes={{
                type: "text",
                id: "name",
                value: name,
                minLength: "3",
                required: true,
              }}
              onChange={inputChangeHandler}
              onValidate={inputValidateHandler}
            />
          </label>
          <label className={classes.email}>
            <p>
              E-mail <span className={classes.asterisk}>*</span>
            </p>
            <Input
              attributes={{
                type: "email",
                id: "email",
                value: email,
                required: true,
              }}
              onChange={inputChangeHandler}
              onValidate={inputValidateHandler}
            />
          </label>
          <label className={classes.phone}>
            <p>
              Nr telefonu <span className={classes.asterisk}>*</span>
            </p>
            <Input
              attributes={{
                type: "tel",
                id: "phoneNumber",
                value: phoneNumber,
                pattern: phoneNumberPattern,
                required: true,
              }}
              onValidate={inputValidateHandler}
              onChange={inputChangeHandler}
            />
          </label>
          <label className={classes.message}>
            <p>
              Wiadomość <span className={classes.asterisk}>*</span>
            </p>
            <Input
              attributes={{
                id: "message",
                minLength: "3",
                value: message,
                required: true,
              }}
              isTextarea={true}
              onChange={inputChangeHandler}
              onValidate={inputValidateHandler}
            />
          </label>
          <Button type="submit">Wyślij</Button>
        </form>
      </section>
      {isLoading && <Loading />}
      {modalState.show && (
        <Modal modalInfo={modalState} onClose={modalCloseHandler} />
      )}
    </React.Fragment>
  );
};

export default Appointments;
