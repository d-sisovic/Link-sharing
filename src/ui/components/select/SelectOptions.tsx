import styles from "./SelectOptions.module.scss";
import { ISelectOptions } from "./ts/models/select-options.model";

const SelectOptions = ({ options, activeOption, onChange, onSelectOption }: ISelectOptions) => {
    return <ul className={styles.container}>
        {options.map((option, index) => {
            const selected = option.value === activeOption;

            return <li className={styles["container__item"]} key={index} onClick={() => onSelectOption(onChange, option.value)}>
                <div className={`${styles["container__item__content"]} ${selected ? styles["container__item__content--selected"] : ""}`}>
                    <img src={option.img} alt="option-img" />
                    <span>{option.label} {selected ? " (Selected)" : ""}</span>
                </div>

                {options.length - 1 !== index && <div className={styles['container__item__line']}></div>}
            </li>;
        })}
    </ul>
}

export default SelectOptions;
