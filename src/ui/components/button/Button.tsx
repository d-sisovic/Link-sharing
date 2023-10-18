import styles from "./Button.module.scss";
import { IButton } from "./ts/models/button.model";

const Button = ({ disabled = false, outlineMode = false, label, clickHandler }: IButton) => {
  const disabledStyle = disabled ? styles['button--disabled'] : '';
  const outlineStyle = outlineMode ? styles['button--outline'] : '';

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    clickHandler();
  };

  return <button className={`${styles['button']} ${disabledStyle} ${outlineStyle}`} onClick={handleButtonClick} disabled={disabled}>
    {label}
  </button>
}

export default Button;

