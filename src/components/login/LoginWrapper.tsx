import styles from "./LoginWrapper.module.scss";
import { IBaseProp } from "../../ts/models/base-prop.model";
import logo from "../../assets/images/logo-devlinks-large.svg";

const LoginWrapper = ({ children }: IBaseProp) => <div className={styles['container']}>
  <img src={logo} alt="logo" className={styles['logo']} />

  <div className={styles['container__children']}>
    {children}
  </div>
</div>

export default LoginWrapper;

