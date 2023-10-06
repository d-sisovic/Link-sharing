import { useState } from "react";
import auth from "../../../firebase";
import { toastrConfig } from "../../util";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.scss";
import LoginWrapper from "../login/LoginWrapper";
import { Routes } from "../../ts/enums/routes.enum";
import Input from "../../ui/components/input/Input";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import emailSvg from "../../assets/images/icon-email.svg";
import passwordSvg from "../../assets/images/icon-password.svg";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

const passwordValidationSchema = {
    required: "Password is required",
    pattern: {
        value: /\S{8,}/,
        message: "Password must contain 8 or more characters"
    }
};

const emailAsyncValidator = async (email: string) => {
    const emailInUse = "Email already in use";

    try {
        const result = await fetchSignInMethodsForEmail(auth, email);

        return result.length ? true : emailInUse;
    } catch {
        return emailInUse;
    }
};

const Register = () => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const { register, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const onRegister = async () => {
        if (!isValid) { return; }

        setIsPending(true);
        const [email, password] = getValues(['email', 'password']);

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            onLoginNavigate(true);
        } catch (error) {
            setIsPending(false);
            toast.error('Error creating account. Please try again!', toastrConfig);
        }
    };

    const onLoginNavigate = (query = false) => {
        const fullUrl = query ? `/${Routes.LOGIN}?toast=true` : `/${Routes.LOGIN}`;

        navigate(fullUrl);
    };

    return (
        <LoginWrapper>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

            <h1 className="title">Create account</h1>

            <h3 className="subtitle">Let’s get you started sharing your links!</h3>

            <div className={styles['container']}>
                <Input type="email" name="email" label="Email address" placeholder="e.g. alex@email.com" register={register} errors={errors} validationSchema={{
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email must be valid"
                    },
                    validate: emailAsyncValidator
                }}>
                    <img src={emailSvg} alt="email" />
                </Input>

                <Input type="password" name="password" label="Create password" placeholder="At least 8 characters"
                    errors={errors}
                    register={register}
                    validationSchema={passwordValidationSchema}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <Input type="password" name="confirmPassword" label="Confirm password" placeholder="At least 8 characters"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        ...passwordValidationSchema,
                        validate: (value: string) => value !== getValues().password ? "Passwords must match" : null
                    }}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <p className={styles['info']}>Password must contain at least 8 characters</p>

                <Button label="Create new account" disabled={!isValid || isPending} clickHandler={onRegister} />

                <div className={styles['navigate']} onClick={() => onLoginNavigate()}>
                    <p>Already have an account?</p>
                    <p className={styles['navigate--highlight']}>Login</p>
                </div>
            </div>
        </LoginWrapper>
    );
}

export default Register;
