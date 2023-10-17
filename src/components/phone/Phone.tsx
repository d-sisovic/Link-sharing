import styles from "./Phone.module.scss";
import phoneSvg from "../../assets/images/illustration-phone-mockup.svg";

const Phone = () => {
    return <div className={styles.container}>
        <img src={phoneSvg} alt="phone" />
    </div>;
};

export default Phone;
