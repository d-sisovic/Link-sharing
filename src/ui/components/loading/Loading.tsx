import Spinner from "../spinner/Spinner";
import styles from "./Loading.module.scss";

const Loading = () => (<div className={styles.container}><Spinner size={4} /></div>);

export default Loading;
