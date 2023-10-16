import styles from "./LinkIntro.module.scss";
import illustrationEmpty from "../../assets/images/illustration-empty.svg";

const LinkIntro = () => {
    return <div className={styles.container}>
        <img src={illustrationEmpty} alt="illustration-empty" className={styles.image} />

        <h1 className={`${styles['title']} title`}>Let's get you started</h1>

        <h3 className={`${styles['subtitle']} subtitle`}>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</h3>
    </div>;
}

export default LinkIntro;

