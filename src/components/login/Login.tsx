import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import LoginWrapper from "./LoginWrapper";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../ts/enums/routes.enum";
import Input from "../../ui/components/input/Input";
import Button from "../../ui/components/button/Button";
import emailSvg from "../../assets/images/icon-email.svg";
import passwordSvg from "../../assets/images/icon-password.svg";

const Login = () => {

  const navigate = useNavigate();
  const { register, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onLogin = () => {
    const [email, password] = getValues(['email', 'password']);

    console.log(email);
    console.log(password);
  };

  const onCreateNavigate = () => navigate(`/${Routes.REGISTER}`);

  return (
    <LoginWrapper>
      <h1 className="title">Login</h1>

      <h3 className="subtitle">Add your details below to get back into the app</h3>

      <form className={styles['container']}>
        <Input name="email" type="email" label="Email address" placeholder="e.g. alex@email.com"
          register={register} errors={errors} validationSchema={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter valid email address format"
            }
          }}>
          <img src={emailSvg} alt="email" />
        </Input>

        <Input name="password" type="password" label="Password" placeholder="Enter your password"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Password is required"
          }}>
          <img src={passwordSvg} alt="password" />
        </Input>

        <Button label="Login" disabled={!isValid} clickHandler={onLogin} />

        <div className={styles['navigate']} onClick={onCreateNavigate}>
          <p>Don't have an account?</p>
          <p className={styles['navigate--highlight']}>Create account</p>
        </div>
      </form>
    </LoginWrapper>
  );
}

export default Login;

