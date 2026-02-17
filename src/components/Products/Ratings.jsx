import classes from "./Ratings.module.css";

const Ratings = (props) => {
  return (
    <div>
      Opinie:
      <div className={classes.rating}>
        <i
          className={`fa-solid fa-star ${classes.star} ${
            props.score >= 20 && classes.checked
          }`}
        ></i>
        <i
          className={`fa-solid fa-star ${classes.star} ${
            props.score >= 40 && classes.checked
          }`}
        ></i>
        <i
          className={`fa-solid fa-star ${classes.star} ${
            props.score >= 60 && classes.checked
          }`}
        ></i>
        <i
          className={`fa-solid fa-star ${classes.star} ${
            props.score >= 80 && classes.checked
          }`}
        ></i>
        <i
          className={`fa-solid fa-star ${classes.star} ${
            props.score >= 95 && classes.checked
          }`}
        ></i>
      </div>
    </div>
  );
};

export default Ratings;
