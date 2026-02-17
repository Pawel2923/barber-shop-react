import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "./Product";
import Aside from "./Aside/Aside";
import Button from "../UI/Button/Button";
import Loading from "../UI/Loading/Loading";
import classes from "./Products.module.css";
import Modal from "../UI/Modal/Modal";
import useHttp from "../../hooks/use-http";
import sortProducts from "./sortProducts";
import filterProducts from "./filterProducts";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

const sliceIntoChunks = (arr, chunkSize) => {
  if (!arr) {
    return;
  }

  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

const Products = () => {
  const [defaultItems, setDefaultItems] = useState([]);
  const [items, setItems] = useState(defaultItems);
  const { error, isLoading, sendRequest, result } = useHttp();
  const [sortBy, setSortBy] = useState("none");
  const [isFiltered, setIsFiltered] = useState(false);
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  useEffect(() => {
    setPageLength(sliceIntoChunks(defaultItems, 10).length);
  }, [defaultItems]);

  useEffect(() => {
    sendRequest(requestConfig);
  }, [sendRequest]);

  useEffect(() => {
    if (result) {
      setDefaultItems(result);
      setItems(result);
    }
  }, [result]);

  useEffect(() => {
    if (pageLength > 0) {
      setItems(sliceIntoChunks(defaultItems, 10)[currPageIndex]);
    }
  }, [currPageIndex, pageLength, defaultItems]);

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
    setItems(sortProducts(items, ev.target.value));
  };

  const filterItems = (filterBy, filterVal) => {
    let filteredProducts = filterProducts(defaultItems, {
      filterBy,
      filterVal,
    });
    filteredProducts = sortProducts(filteredProducts, sortBy);

    setIsFiltered(true);
    setItems(filteredProducts);
  };

  const resetItems = () => {
    setIsFiltered(false);
    setItems(sortProducts(defaultItems, sortBy));
  };

  const nextPageClickHandler = () => {
    setCurrPageIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
      if (nextIndex > pageLength - 1) {
        return 0;
      }
      return nextIndex;
    });
    window.scroll({
      top: 0,
    });
  };

  const prevPageClickhandler = () => {
    setCurrPageIndex((prevIndex) => {
      let nextIndex = prevIndex - 1;
      if (nextIndex < 0) {
        return pageLength - 1;
      }
      return nextIndex;
    });
    window.scroll({
      top: 0,
    });
  };

  const pageIndexClickHandler = (index) => {
    setCurrPageIndex(index);
    
    window.scroll({
      top: 0,
    });
  };

  let products = <h3>Nie znaleziono produktów</h3>;

  if (items && items.length > 0) {
    products = items.map((item) => (
      <Product
        key={item.id}
        info={{
          id: item.id,
          title: item.title,
          imagePath: item.imagePath,
          description: item.description,
          price: item.price,
          score: item.score,
          category: item.category,
        }}
      />
    ));
  }

  let pages = [];

  for (let i = 0; i < pageLength; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={classes["products-container"]}>
      <Aside onFilter={filterItems} onReset={resetItems} />
      <section className={classes["products-catalog"]}>
        <div className={classes.sort}>
          <form>
            <select
              id="sortBy"
              onChange={sortSelectChangeHandler}
              defaultValue={sortBy}
            >
              <option value="none" hidden>Sortuj wyniki</option>
              <option value="titleA">Nazwa (A-Z)</option>
              <option value="titleZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="score">Najwyżej oceniane</option>
            </select>
          </form>
          <div className={classes["cart-wrapper"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </div>
        </div>
        {products}
        {error && (
          <Modal
            modalInfo={{
              show: true,
              error: true,
              title: "Wystapił Błąd",
              message: error,
            }}
          />
        )}
        {isLoading && <Loading />}
        {!isFiltered && !isLoading && (
          <div className={classes["page-index"]}>
            <Button onClick={prevPageClickhandler} className={classes["page-button"]}>
              <i className="fa-solid fa-chevron-left"></i>
            </Button>
            {pages.map((pageIndex, index) => {
              let highlight = "";
              if (currPageIndex === index) {
                highlight = classes.highlighted;
              }
              return (
                <span
                  key={index}
                  className={highlight}
                  onClick={pageIndexClickHandler.bind(null, index)}
                >
                  {pageIndex}
                </span>
              );
            })}
            <Button onClick={nextPageClickHandler} className={classes["page-button"]}>
              <i className="fa-solid fa-chevron-right"></i>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
