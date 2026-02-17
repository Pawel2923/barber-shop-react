import { useContext } from "react";

import Nav from "./Nav/Nav";
import MobileNav from "./Nav/MobileNav";
import classes from "./Header.module.css";
import WindowSizeContext from "../../store/window-size";

const Header = () => {
  const windowSizeCtx = useContext(WindowSizeContext);
  let navigation;
  if (windowSizeCtx.width >= 700) navigation = <Nav />;
  else navigation = <MobileNav />;

  return (
    <header className={classes.header}>
      <nav>
        <ul>{navigation}</ul>
      </nav>
    </header>
  );
};

export default Header;
