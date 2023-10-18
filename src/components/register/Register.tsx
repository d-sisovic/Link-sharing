import auth, { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.scss";
import LoginWrapper from "../login/LoginWrapper";
import { doc, setDoc } from "firebase/firestore";
import { useLogout } from "../../hooks/use-logout";
import Input from "../../ui/components/input/Input";
import { FieldError, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { Firebase } from "../../ts/enums/firebase.enum";
import emailSvg from "../../assets/images/icon-email.svg";
import { INPUT_TYPE } from "../../ts/enums/input-type.enum";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { useState, useMemo, useCallback, memo } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { emailAsyncValidator, toastrConfig } from "../../util";
import passwordSvg from "../../assets/images/icon-password.svg";

const emailInputAttribute = { name: "email", label: "Email address", type: INPUT_TYPE.EMAIL, placeholder: "e.g. alex@email.com" };

const passwordInputAttribute = { name: "password", label: "Create password", type: INPUT_TYPE.PASSWORD, placeholder: "At least 8 characters" };

const confirmPasswordInputAttribute = { name: "confirmPassword", label: "Confirm password", type: INPUT_TYPE.PASSWORD, placeholder: "At least 8 characters" };


const emailValidationSchema = {
    required: "Required",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Must be valid"
    },
    validate: emailAsyncValidator
};

const passwordValidationSchema = {
    required: "Required",
    pattern: {
        value: /\S{8,}/,
        message: "Must have 8/more characters"
    }
};

const LoginWrapperMemo = memo(LoginWrapper);

const Register = () => {
    useLogout();

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState<boolean>(false);
    const { register, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const emailErrors = errors[emailInputAttribute.name] as FieldError;
    const passwordErrors = errors[passwordInputAttribute.name] as FieldError;
    const confirmPasswordErrors = errors[confirmPasswordInputAttribute.name] as FieldError;

    const onLoginNavigate = useCallback((query = false) => {
        const fullUrl = query ? `/${RoutePaths.LOGIN}?toast=true` : `/${RoutePaths.LOGIN}`;

        navigate(fullUrl);
    }, [navigate]);

    const onRegister = useCallback(async () => {
        if (!isValid) { return; }

        setIsPending(true);
        const [email, password] = getValues(['email', 'password']);

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, Firebase.USERS, userCredentials.user.uid), { email });

            onLoginNavigate(true);
        } catch {
            setIsPending(false);
            toast.error('Error creating account. Please try again!', toastrConfig);
        }
    }, [isValid, getValues, onLoginNavigate]);

    const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);
    const ButtonMemo = useMemo(() => <Button label="Create new account" disabled={!isValid || isPending} clickHandler={onRegister} />, [isPending, isValid, onRegister]);

    const confirmPasswordValidationSchema = useMemo(() => ({
        ...passwordValidationSchema,
        validate: (value: string) => value !== getValues().password ? "Passwords must match" : null
    }), [getValues]);


    /**
     * Memoized email field variables.
     */

    const EmailChildrenMemo = useMemo(() => <img src={emailSvg} alt="email" />, []);

    const EmailInputFormMemo = useMemo(() =>
        ({ register, errors: emailErrors, validationSchema: emailValidationSchema }), [emailErrors, register]);

    const EmailFieldMemo = useMemo(() => <Input inputAttribute={emailInputAttribute}
        inputForm={EmailInputFormMemo} children={EmailChildrenMemo} />, [EmailChildrenMemo, EmailInputFormMemo]);


    /**
     * Memoized password field variables.
     */

    const PasswordChildrenMemo = useMemo(() => <img src={passwordSvg} alt="password" />, []);

    const PasswordInputFormMemo = useMemo(() =>
        ({ register, errors: passwordErrors, validationSchema: passwordValidationSchema }), [passwordErrors, register]);

    const PasswordFieldMemo = useMemo(() => <Input inputAttribute={passwordInputAttribute}
        inputForm={PasswordInputFormMemo} children={PasswordChildrenMemo} />,
        [PasswordInputFormMemo, PasswordChildrenMemo]);


    /**
    * Memoized confirm password field variables.
    */

    const ConfirmPasswordInputFormMemo = useMemo(() =>
        ({ register, errors: confirmPasswordErrors, validationSchema: confirmPasswordValidationSchema }),
        [confirmPasswordErrors, confirmPasswordValidationSchema, register]);

    const ConfirmPasswordFieldMemo = useMemo(() => <Input inputAttribute={confirmPasswordInputAttribute}
        inputForm={ConfirmPasswordInputFormMemo} children={PasswordChildrenMemo} />,
        [ConfirmPasswordInputFormMemo, PasswordChildrenMemo]);

    const ContentMemo = useMemo(() => {
        return <>
            {ToastrMemo}

            <h1 className="title">Create account</h1>

            <h3 className="subtitle">Let's get you started sharing your links!</h3>

            <div className={styles.form}>
                {EmailFieldMemo}

                {PasswordFieldMemo}

                {ConfirmPasswordFieldMemo}

                <p className={styles['form__validation__text']}>Password must contain at least 8 characters</p>

                {ButtonMemo}

                <div className={styles['form__navigate']} onClick={() => onLoginNavigate()}>
                    <p>Already have an account?</p>
                    <p className={styles['form__navigate--highlight']}>Login</p>
                </div>
            </div>
        </>;
    }, [ButtonMemo, ConfirmPasswordFieldMemo, EmailFieldMemo, PasswordFieldMemo, ToastrMemo, onLoginNavigate]);

    return <LoginWrapperMemo children={ContentMemo} />;
}

export default Register;
