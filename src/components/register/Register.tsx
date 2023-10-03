import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.scss";
import LoginWrapper from "../login/LoginWrapper";
import { Routes } from "../../ts/enums/routes.enum";
import Input from "../../ui/components/input/Input";
import Button from "../../ui/components/button/Button";
import emailSvg from "../../assets/images/icon-email.svg";
import passwordSvg from "../../assets/images/icon-password.svg";

const Register = () => {

    const navigate = useNavigate();
    const { register, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const onRegister = () => {
        const [email, password] = getValues(['email', 'password', 'confirmPassword']);

        console.log(email);
        console.log(password);
    };

    const onLoginNavigate = () => navigate(`/${Routes.LOGIN}`);

    return (
        <LoginWrapper>
            <h1 className="title">Create account</h1>

            <h3 className="subtitle">Let’s get you started sharing your links!</h3>

            <div className={styles['container']}>
                <Input type="email" name="email" label="Email address" placeholder="e.g. alex@email.com" register={register} errors={errors} validationSchema={{
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter valid email address format"
                    }
                }}>
                    <img src={emailSvg} alt="email" />
                </Input>

                <Input type="password" name="password" label="Create password" placeholder="At least 8 characters"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Password is required",
                        pattern: {
                            value: /\S{8,}/,
                            message: "Password must contain 8 or more characters"
                        }
                    }}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <Input type="password" name="confirmPassword" label="Confirm password" placeholder="At least 8 characters"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Password is required",
                        validate: (value: string) =>  value !== getValues().password ? "Passwords must match" : null,
                        pattern: {
                            value: /\S{8,}/,
                            message: "Password must contain 8 or more characters"
                        }
                    }}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <p className={styles['info']}>Password must contain at least 8 characters</p>

                <Button label="Create new account" disabled={!isValid} clickHandler={onRegister} />

                <div className={styles['navigate']} onClick={onLoginNavigate}>
                    <p>Already have an account?</p>
                    <p className={styles['navigate--highlight']}>Login</p>
                </div>
            </div>
        </LoginWrapper>
    );
}

export default Register;

