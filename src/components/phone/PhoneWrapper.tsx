import Phone from "./Phone";
import styles from "./PhoneWrapper.module.scss";
import { IBaseProp } from "../../ts/models/base-prop.model";

const PhoneWrapper = ({ children }: IBaseProp) => {
    return <div className={styles.container}>
        <div className={styles['container__phone']}>
            <Phone />
        </div>

        <div className={styles['container__body']}>
            {children}
        </div>
    </div>;
}

export default PhoneWrapper;
