import auth from "../../../firebase";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import LoginWrapper from "./LoginWrapper";
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from "../../ts/enums/routes.enum";
import Input from "../../ui/components/input/Input";
import { useEffect, useRef, useState } from "react";
import Button from "../../ui/components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import emailSvg from "../../assets/images/icon-email.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import passwordSvg from "../../assets/images/icon-password.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialized = useRef(false);
  const toastValue = searchParams.get('toast');
  const [isPending, setIsPending] = useState(false);
  const { register, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onLogin = async () => {
    if (!isValid) { return; }

    setIsPending(true);
    const [email, password] = getValues(['email', 'password']);

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
      // onNavigate(Routes.HOME);
    } catch (error) {
      setIsPending(false);
      toast.error('Error logging in. Please try again!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (initialized.current || !toastValue) { return; }

    initialized.current = true;

    toast.success('Account successfully created. Please login!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setSearchParams('');
  }, [toastValue, setSearchParams]);

  const onNavigate = (url: Routes) => navigate(`/${url}`);

  return (
    <LoginWrapper>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h1 className="title">Login</h1>

      <h3 className="subtitle">Add your details below to get back into the app</h3>

      <form className={styles['container']}>
        <Input name="email" type="email" label="Email address" placeholder="e.g. alex@email.com"
          register={register} errors={errors} validationSchema={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Enter valid email address format"
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

        <Button label="Login" disabled={!isValid || isPending} clickHandler={onLogin} />

        <div className={styles['navigate']} onClick={() => onNavigate(Routes.REGISTER)}>
          <p>Don't have an account?</p>
          <p className={styles['navigate--highlight']}>Create account</p>
        </div>
      </form>
    </LoginWrapper>
  );
}

export default Login;

