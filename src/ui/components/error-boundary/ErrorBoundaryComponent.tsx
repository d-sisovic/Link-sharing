import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorBoundary.module.scss";
import { RoutePaths } from "../../../ts/enums/rout-paths.enum";
import LoginWrapper from "../../../components/login/LoginWrapper";

const ErrorBoundaryComponent = () => {
    const navigate = useNavigate();
    const goToLogin = () => navigate(`/${RoutePaths.LOGIN}`);

    return <LoginWrapper>
        <div className={styles.container}>
            <h1 className="title">Unexpected Error</h1>
            <h3 className="subtitle">Please contact developer at: <b>siskoftn@gmail.com</b></h3>

            <Button label="Go to login" clickHandler={goToLogin} />
        </div>
    </LoginWrapper>;
}

export default ErrorBoundaryComponent;

