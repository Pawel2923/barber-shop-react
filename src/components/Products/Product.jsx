import { Link } from "react-router-dom";

import Ratings from "./Ratings";
import classes from "./Product.module.css";
import { getImageUrl } from "../../utils/product-images";

const Product = (props) => {
  const productInfo = props.info;
  productInfo.price = parseFloat(productInfo.price).toFixed(2).toString().replace(/\./g, ",") + "zł";

  return (
    <Link to={`products/${productInfo.id}`}>
      <div className={classes.card}>
        <div className={classes["image-wrapper"]}>
          <img
            src={getImageUrl(productInfo.imagePath)}
            alt="Zdjęcie produktu"
            className={classes.image}
          />
        </div>
        <div className={classes["desc-wrapper"]}>
          <h3>{productInfo.title}</h3>
          <div>{productInfo.description}</div>
          <div>Cena: {productInfo.price}</div>
          <Ratings score={productInfo.score} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
