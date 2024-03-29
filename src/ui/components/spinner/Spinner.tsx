import styles from "./Spinner.module.scss";
import { ISpinner } from "./ts/models/spinner.model";

const Spinner = ({ size }: ISpinner) =>
    <span className={styles.spinner} style={{ width: `${size}rem`, height: `${size}rem` }} data-testid="spinner"></span>

export default Spinner;

