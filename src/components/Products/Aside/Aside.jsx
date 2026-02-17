import { Fragment, useState, useContext, useEffect } from "react";

import Button from "../../UI/Button/Button";
import { categories } from "./categories";
import classes from "./Aside.module.css";
import WindowSizeContext from "../../../store/window-size";

const Aside = (props) => {
  const windowSizeCtx = useContext(WindowSizeContext);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [isChecked, setIsChecked] = useState(
    new Array(categories.length).fill(false)
  );
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (windowSizeCtx.width < 700) {
      setShowFilters(false);
    }
  }, [windowSizeCtx.width]);

  const minPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMin(value);
    } else {
      setPriceMin(0);
    }
  };

  const maxPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMax(value);
    } else {
      setPriceMax(0);
    }
  };

  const checkboxChangeHandler = (pos) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === pos ? !item : item
    );

    setIsChecked(updatedIsChecked);
  };

  const formBtnClickHandler = () => {
    setShowFilters((prevValue) => {
      return prevValue ? false : true;
    });
  };

  const filterSubmitHandler = (ev) => {
    ev.preventDefault();

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];

    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        checked.push(checkbox);
      }
    }

    if (checked.length > 0 && (priceMin > 0 || priceMax > 0)) {
      props.onFilter("combined", {
        minValue: priceMin,
        maxValue: priceMax,
        checkboxes: checked,
      });
    } else if (checked.length > 0 && priceMin === 0 && priceMax === 0) {
      props.onFilter("categories", checked);
    } else if (priceMin > 0 || priceMax > 0) {
      props.onFilter("price", { minValue: priceMin, maxValue: priceMax });
    } else {
      props.onFilter("none");
    }
  };

  const filterResetHandler = () => {
    setPriceMin(0);
    setPriceMax(0);
    setIsChecked(new Array(categories.length).fill(false));
    props.onReset();
  };

  let formContent = (
    <Fragment>
      <div className={classes.categories}>
        <div className={classes["aside-top"]}>
          <h3>Kategoria</h3>
          <Button
            className={classes.close}
            onClick={formBtnClickHandler}
            closeBtn={true}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
        {categories.map((category, index) => (
          <label key={`category-${index}`}>
            <input
              type="checkbox"
              id={`category-${index}`}
              name={category.name}
              value={category.value}
              checked={isChecked[index]}
              onChange={() => {
                checkboxChangeHandler(index);
              }}
            />
            <span className="text">{category.name}</span>
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <div className={classes.price}>
        <h3>Cena</h3>
        <label>
          <span>Od</span>
          <input type="number" id="priceMin" onChange={minPriceChangeHandler} />
        </label>
        <label>
          <span>Do</span>
          <input type="number" id="priceMax" onChange={maxPriceChangeHandler} />
        </label>
      </div>

      <Button
        type="reset"
        onClick={formBtnClickHandler}
        className={classes["reset-btn"]}
      >
        Resetuj filtry
      </Button>
    </Fragment>
  );

  if (windowSizeCtx.width < 700) {
    formContent = (
      <Fragment>
        {showFilters && <div id="asideFormContent">{formContent}</div>}
        {!showFilters && (
          <Button
            onClick={formBtnClickHandler}
            className={classes["form-content-btn"]}
          >
            Pokaż filtry
          </Button>
        )}
      </Fragment>
    );
  }

  const submitBtn =
    windowSizeCtx.width < 700 ? (
      showFilters && (
        <Button type="submit" className={classes["submit-btn"]}>
          Filtruj
        </Button>
      )
    ) : (
      <Button type="submit" className={classes["submit-btn"]}>
        Filtruj
      </Button>
    );

  return (
    <aside className={classes.aside}>
      <div className="filter">
        <form onSubmit={filterSubmitHandler} onReset={filterResetHandler}>
          {formContent}
          {submitBtn}
        </form>
      </div>
    </aside>
  );
};

export default Aside;
