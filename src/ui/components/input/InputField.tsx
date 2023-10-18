import styles from "./InputField.module.scss";
import { IInput } from "./ts/models/input.model";

const InputField = ({ children, expandRowDesktop, inputAttribute, inputForm }: IInput) => {
    const { name, type, placeholder } = inputAttribute;
    const { errors, validationSchema, register } = inputForm;

    const invalidStyle = errors ? styles['container--error'] : '';
    const rowStyle = expandRowDesktop ? styles['container--row'] : '';

    return <div className={`${styles.container} ${invalidStyle} ${rowStyle}`}>
        <span className={styles['container__icon']}>{children}</span>

        <input type={type} placeholder={placeholder} {...register(name, validationSchema)} className={`${!children ? styles['container--iconless'] : ''}`} />

        {errors && <span className={styles['container__error']}>{errors.message}</span>}
    </div>
}

export default InputField;

