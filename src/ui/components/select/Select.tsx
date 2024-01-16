import SelectInput from "./SelectInput";
import styles from "./Select.module.scss";
import SelectOptions from "./SelectOptions";
import { Controller } from "react-hook-form";
import { ISelect } from "./ts/models/select.model";
import { useState, useMemo, useCallback } from "react";

const Select = ({ active, label, options, name, control }: ISelect) => {
    const [activeOption, setActiveOption] = useState<string>(active);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    /**
     * 1. onChange - sets value to react-hook-form
     * 2. setActiveOption - sets active option value
     * 3. setDropdownVisible - closes dropdown
     */
    const onSelectOption = (onChange: (value: string) => void, value: string) => {
        onChange(value);
        setActiveOption(value);
        setDropdownVisible(false);
    };

    const activeItem = useMemo(() => options.find(option => option?.value === activeOption) || null, [activeOption, options]);

    const onToggleExpand = useCallback(() => setDropdownVisible(previousState => !previousState), []);

    const SelectInputMemo = useMemo(() => <SelectInput activeItem={activeItem} dropdownVisible={dropdownVisible}
        onToggleExpand={onToggleExpand} setDropdownVisible={setDropdownVisible}></SelectInput>, [activeItem, dropdownVisible, onToggleExpand]);

    return <Controller control={control} name={name} render={({ field: { onChange } }) => (
        <div className={styles.container}>
            <label>{label}</label>

            {SelectInputMemo}

            {dropdownVisible && <SelectOptions options={options} activeOption={activeOption}
                onChange={onChange} onSelectOption={onSelectOption} />}
        </div>
    )} />;
}

export default Select;
