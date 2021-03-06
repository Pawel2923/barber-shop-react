import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import styles from './MobileNav.module.css';
import optionStyles from './Option.module.css';
import { ReactComponent as Logo } from 'assets/logo.svg';

export const NavOverlay = (props) => {
  const closeHandler = () => {
    props.closeHandler();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <nav>
        <div className={styles['close-wrapper']}>
          <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
          <Link to="/home" className={styles['image-wrapper']}>
            <Logo />
          </Link>
        </div>
        <ul>
          <li className={optionStyles.option}>
            <Link to="/home" onClick={closeHandler}>
              Strona główna
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/appointments" onClick={closeHandler}>
            Wizyty
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/products" onClick={closeHandler}>
              Produkty
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/contact" onClick={closeHandler}>
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
      <footer className={styles.footer}>
        <p>Wszelkie prawa zastrzeżone &copy; 2022</p>
      </footer>
    </div>,
    document.getElementById('overlays')
  );
};

const MobileNav = () => {
  const [isOverlayClosed, setIsOverlayClosed] = useState(true);

  const openHandler = () => {
    document.body.style.overflow = 'hidden';
    
    setIsOverlayClosed(false);
  };

  const closeHandler = () => {
    document.body.style.overflow = 'initial';

    setIsOverlayClosed(true);
  };

  return (
    <Fragment>
      <li>
        <i className="fa-solid fa-bars" onClick={openHandler}></i>
      </li>
      <li>
        <Link to="/home" className={styles['image-wrapper']}>
          <Logo />
        </Link>
      </li>
      {!isOverlayClosed && <NavOverlay closeHandler={closeHandler} />}
    </Fragment>
  );
};

export default MobileNav;
