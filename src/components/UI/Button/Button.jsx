import styles from "./Button.module.css";

const Button = (props) => {
  let btnClassname = styles.button;
  if (props.className !== undefined) btnClassname += ` ${props.className}`;
  if (props.closeBtn === true) btnClassname += ` ${styles["close-btn"]}`;

  return (
    <button
      type={props.type !== undefined ? props.type : "button"}
      onClick={props.onClick}
      className={btnClassname}
    >
      {props.children}
    </button>
  );
};

export default Button;
