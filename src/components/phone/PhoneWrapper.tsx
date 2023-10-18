import Phone from "./Phone";
import { useMemo } from "react";
import styles from "./PhoneWrapper.module.scss";
import { IBaseProp } from "../../ts/models/base-prop.model";

const PhoneWrapper = ({ children }: IBaseProp) => {
    const PhoneMemo = useMemo(() => <Phone />, []);

    return <div className={styles.container}>
        <div className={styles['container__phone']}>{PhoneMemo}</div>

        <div className={styles['container__body']}>{children}</div>
    </div>;
}

export default PhoneWrapper;
