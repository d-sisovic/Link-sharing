import styles from "./Card.module.scss";
import { IBaseProp } from "../../../ts/models/base-prop.model";

const Card = ({ children }: IBaseProp) => <div className={styles.container}>{children}</div>

export default Card;

