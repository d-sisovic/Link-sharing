import { useMemo } from "react";
import InputField from "./InputField";
import styles from "./Input.module.scss";
import { IInput } from "./ts/models/input.model";

const Input = (props: IInput) => {
    const { expandRowDesktop, inputAttribute } = props;
    const { label } = inputAttribute;

    const InputFieldMemo = useMemo(() => <InputField {...props} />, [props]);

    return <div className={`${styles.container} ${expandRowDesktop ? styles['container--row'] : ''}`}>
        <label className={styles['container__label']}>{label}</label>

        {InputFieldMemo}
    </div>
}

export default Input;

