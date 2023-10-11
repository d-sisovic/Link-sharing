import styles from "./Select.module.scss";
import { LegacyRef, useState } from "react";
import { Controller } from "react-hook-form";
import { ISelect } from "./ts/models/select.model";
import chevronDown from "../../../assets/images/icon-chevron-down.svg";
import { useClickedOutside } from "../../../hooks/use-clicked-outside";

const Select = ({ active, label, options, name, control }: ISelect) => {
    const [activeOption, setActiveOption] = useState<string>(active);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const { ref } = useClickedOutside(setDropdownVisible);

    const onSelectOption = (onChange: (value: string) => void, value: string) => {
        onChange(value);
        setActiveOption(value);
        setDropdownVisible(false);
    };

    const onToggleExpand = () => setDropdownVisible(previousState => !previousState);

    const activeItem = options.find(option => option?.value === activeOption);

    return <Controller control={control} name={name} render={({ field: { onChange } }) => (
        <div className={styles.container}>
            <label>{label}</label>

            <div className={`${styles.subcontainer}  ${dropdownVisible ? styles['subcontainer--expanded'] : ''}`} onClick={onToggleExpand}
                ref={ref as unknown as LegacyRef<HTMLDivElement>}>
                <div className={styles['subcontainer__value']}>
                    <img src={activeItem?.img} alt="link" />

                    <span>{activeItem?.label}</span>
                </div>

                <img src={chevronDown} alt="arrow" className={dropdownVisible ? styles['chevron--up'] : ''} />
            </div>

            {dropdownVisible && <ul className={styles.options}>
                {options.map((option, index) => <li className={styles.item} key={index}
                    onClick={() => onSelectOption(onChange, option.value)}>
                    <div className={`${styles["item__option"]} ${option.value === activeOption ? styles["item__option--selected"] : ""}`}>
                        <img src={option.img} alt="option-img" />
                        <span>{option.label} {option.value === activeOption ? " (Selected)" : ""}</span>
                    </div>

                    {options.length - 1 !== index && <div className={styles['item__line']}></div>}
                </li>)}
            </ul>}
        </div>
    )} />;
}

export default Select;
