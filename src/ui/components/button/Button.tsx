import styles from "./Button.module.scss";
import { IButton } from "./ts/models/button.model";

const Button = ({ disabled = false, outlineMode = false, label, clickHandler }: IButton) => {
  const disabledStyle = disabled ? styles['button--disabled'] : '';
  const outlineStyle = outlineMode ? styles['button--outline'] : '';

  return <button className={`${styles['button']} ${disabledStyle} ${outlineStyle}`}
    onClick={(event) => {
      event.preventDefault();

      clickHandler();
    }} disabled={disabled}>
    {label}
  </button>
}

export default Button;

