import styles from "./Button.module.scss";
import { IButton } from "./ts/models/button.model";

const Button = ({ disabled = false, label, clickHandler }: IButton) => {
  return <button className={`${styles['button']} ${disabled ? styles['button--disabled'] : ''}`}
    onClick={(event) => {
      event.preventDefault();

      clickHandler();
    }} disabled={disabled}>{label}</button>
}

export default Button;

