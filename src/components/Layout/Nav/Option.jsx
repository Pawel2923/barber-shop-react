import { Link } from "react-router-dom";

import classes from "./Option.module.css";

const Option = (props) => {
  return (
    <li className={classes.option}>
      <Link {...props.link}>{props.children}</Link>
    </li>
  );
};

export default Option;
