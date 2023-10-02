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

    const onRegister = () => {
        console.log("register");
    };

    const onLoginNavigate = () => navigate(`/${Routes.LOGIN}`);

    return (
        <LoginWrapper>
            <h1 className="title">Create account</h1>

            <h3 className="subtitle">Let’s get you started sharing your links!</h3>

            <div className={styles['container']}>
                <Input type="email" label="Email address" placeholder="e.g. alex@email.com" haveError={false}>
                    <img src={emailSvg} alt="email" />
                </Input>

                <Input type="password" label="Create password" placeholder="At least 8 characters" haveError={false}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <Input type="password" label="Confirm password" placeholder="At least 8 characters" haveError={false}>
                    <img src={passwordSvg} alt="password" />
                </Input>

                <Button label="Create new account" disabled={false} clickHandler={onRegister} />

                <p className={styles['info']}>Password must contain at least 8 characters</p>

                <div className={styles['navigate']} onClick={onLoginNavigate}>
                    <p>Already have an account?</p>
                    <p className={styles['navigate--highlight']}>Login</p>
                </div>
            </div>
        </LoginWrapper>
    );
}

export default Register;

