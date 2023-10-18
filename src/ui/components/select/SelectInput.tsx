import { LegacyRef } from "react";
import styles from "./SelectInput.module.scss";
import { ISelectInput } from "./ts/models/select-input.model";
import chevronDown from "../../../assets/images/icon-chevron-down.svg";
import { useClickedOutside } from "../../../hooks/use-clicked-outside";

const SelectInput = ({ dropdownVisible, activeItem, setDropdownVisible, onToggleExpand }: ISelectInput) => {
    const { ref } = useClickedOutside(setDropdownVisible);
   
    return <div className={`${styles.container} ${dropdownVisible ? styles['container--expanded'] : ''}`}
        onClick={onToggleExpand} ref={ref as LegacyRef<HTMLDivElement>}>
        <div className={styles['container__value']}>
            {activeItem && <>
                <img src={activeItem.img} alt="link" />

                <span>{activeItem.label}</span>
            </>}
        </div>

        <img src={chevronDown} alt="arrow" className={dropdownVisible ? styles['chevron--up'] : ''} />
    </div>;
}

export default SelectInput;
