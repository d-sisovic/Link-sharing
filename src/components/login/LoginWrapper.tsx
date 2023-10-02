import styles from "./LoginWrapper.module.scss";
import { IBaseProp } from "../../ts/models/base-prop.model";
import logo from "../../assets/images/logo-devlinks-large.svg";

const LoginWrapper = ({ children }: IBaseProp) => {
  return (
    <>
      <img src={logo} alt="logo" className={styles['logo']} />

      {children}
    </>
  );
}

export default LoginWrapper;

