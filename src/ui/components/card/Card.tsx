import styles from "./Card.module.scss";
import { IBaseProp } from "../../../ts/models/base-prop.model";

const Card = ({ children }: IBaseProp) => {
  return <div className={styles.card}>
    {children}
  </div>
}

export default Card;

