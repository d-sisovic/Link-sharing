import auth from "../../../firebase";
import styles from "./Login.module.scss";
import { toastrConfig } from "../../util";
import LoginWrapper from "./LoginWrapper";
import { useLogout } from "../../hooks/use-logout";
import Input from "../../ui/components/input/Input";
import { FieldError, useForm } from "react-hook-form";
import Button from "../../ui/components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import emailSvg from "../../assets/images/icon-email.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { INPUT_TYPE } from "../../ts/enums/input-type.enum";
import passwordSvg from "../../assets/images/icon-password.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState, useMemo, memo, useCallback } from "react";

const emailInputAttribute = { name: "email", type: INPUT_TYPE.EMAIL, label: "Email address", placeholder: "e.g. alex@email.com" };
const passwordInputAttribute = { name: "password", type: INPUT_TYPE.PASSWORD, label: "Password", placeholder: "Enter your password" };

const passwordValidationSchema = { required: "Required" };

const emailValidationSchema = {
  required: "Required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Must be valid"
  }
};

const LoginWrapperMemo = memo(LoginWrapper);

const Login = () => {
  useLogout();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const toastValue = searchParams.get('toast');

  const initialized = useRef(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { register, getValues, formState: { isValid, errors } } = useForm({ mode: 'onChange' });

  const emailErrors = errors[emailInputAttribute.name] as FieldError;
  const passwordErrors = errors[passwordInputAttribute.name] as FieldError;

  const onNavigate = useCallback((url: RoutePaths) => navigate(`/${url}`), [navigate]);

  const onLogin = useCallback(async () => {
    if (!isValid) { return; }

    setIsPending(true);
    const [email, password] = getValues(['email', 'password']);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      onNavigate(RoutePaths.LINK);
    } catch {
      setIsPending(false);
      toast.error('Error logging in. Please try again!', toastrConfig);
    }
  }, [isValid, getValues, onNavigate]);

  useEffect(() => {
    if (initialized.current || !toastValue) { return; }

    initialized.current = true;

    toast.success('Account successfully created. Please login!', toastrConfig);

    setSearchParams('');
  }, [toastValue, setSearchParams]);

  const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);
  const ButtonMemo = useMemo(() => <Button label="Login" disabled={!isValid || isPending} clickHandler={onLogin} />, [isPending, isValid, onLogin]);

  const EmailFieldChildrenMemo = useMemo(() => <img src={emailSvg} alt="email" />, []);
  const EmailFieldInputFormMemo = useMemo(() => ({ register, errors: emailErrors, validationSchema: emailValidationSchema }), [emailErrors, register]);

  const EmailFieldMemo = useMemo(() => <Input inputAttribute={emailInputAttribute} children={EmailFieldChildrenMemo}
    inputForm={EmailFieldInputFormMemo} />, [EmailFieldChildrenMemo, EmailFieldInputFormMemo]);

  const PasswordFieldChildrenMemo = useMemo(() => <img src={passwordSvg} alt="password" />, []);
  const PasswordFieldInputFormMemo = useMemo(() => ({ register, errors: passwordErrors, validationSchema: passwordValidationSchema }), [passwordErrors, register]);

  const PasswordFieldMemo = useMemo(() => <Input inputAttribute={passwordInputAttribute} children={PasswordFieldChildrenMemo}
    inputForm={PasswordFieldInputFormMemo} />, [PasswordFieldChildrenMemo, PasswordFieldInputFormMemo]);

  const ContentMemo = useMemo(() => {
    return <>
      {ToastrMemo}

      <h1 className="title">Login</h1>

      <h3 className="subtitle">Add your details below to get back into the app</h3>

      <form className={styles.form}>
        {EmailFieldMemo}

        {PasswordFieldMemo}

        {ButtonMemo}

        <div className={styles['form__navigate']} onClick={() => onNavigate(RoutePaths.REGISTER)}>
          <p>Don't have an account?</p>
          <p className={styles['form__navigate--highlight']}>Create account</p>
        </div>
      </form>
    </>;
  }, [ButtonMemo, EmailFieldMemo, PasswordFieldMemo, ToastrMemo, onNavigate]);

  return <LoginWrapperMemo children={ContentMemo} />;
}

export default Login;
