import styles from "./Input.module.scss";
import { IInput } from "./ts/models/input.model";

const Input = ({ type = "text", label, placeholder, haveError, children }: IInput) => {
    return <div className={styles['container']}>
        <label htmlFor={label}>{label}</label>

        <div className={`${styles['container__input']} ${haveError ? styles['container__input--error'] : ''}`}>
            <span className={styles['container__input__icon']}>{children}</span>
            <input type={type} id={label} placeholder={placeholder} />

            {haveError && <span className={styles['container__input__error']}>Please check again</span>} 
        </div>
    </div>
}

export default Input;

