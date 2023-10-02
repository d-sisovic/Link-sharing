import styles from "./Login.module.scss";
import LoginWrapper from "./LoginWrapper";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../ts/enums/routes.enum";
import Input from "../../ui/components/input/Input";
import Button from "../../ui/components/button/Button";
import emailSvg from "../../assets/images/icon-email.svg";
import passwordSvg from "../../assets/images/icon-password.svg";

const Login = () => {

  const navigate = useNavigate();

  const onLogin = () => {
    console.log("login");
  };

  const onCreateNavigate = () => navigate(`/${Routes.REGISTER}`);

  return (
    <LoginWrapper>
      <h1 className="title">Login</h1>

      <h3 className="subtitle">Add your details below to get back into the app</h3>

      <div className={styles['container']}>
        <Input type="email" label="Email address" placeholder="e.g. alex@email.com" haveError={false}>
          <img src={emailSvg} alt="email" />
        </Input>

        <Input type="password" label="Password" placeholder="Enter your password" haveError={false}>
          <img src={passwordSvg} alt="password" />
        </Input>

        <Button label="Login" disabled={false} clickHandler={onLogin} />

        <div className={styles['navigate']} onClick={onCreateNavigate}>
          <p>Don't have an account?</p>
          <p className={styles['navigate--highlight']}>Create account</p>
        </div>
      </div>
    </LoginWrapper>
  );
}

export default Login;

