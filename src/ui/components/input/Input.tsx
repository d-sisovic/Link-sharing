import styles from "./Input.module.scss";
import { IInput } from "./ts/models/input.model";

const Input = ({ name, type = "text", label, placeholder, children, register, errors, validationSchema }: IInput) => {
    return <div className={styles['container']}>
        <label htmlFor={label}>{label}</label>

        <div className={`${styles['container__input']} ${errors && errors[name] ? styles['container__input--error'] : ''}`}>
            <span className={styles['container__input__icon']}>{children}</span>
            <input type={type} id={label} placeholder={placeholder} {...register(name, validationSchema)} />

            {errors && errors[name] && <span className={styles['container__input__error']}>{errors[name]?.message as string}</span>} 
        </div>
    </div>
}

export default Input;

