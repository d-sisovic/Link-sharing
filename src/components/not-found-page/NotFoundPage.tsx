import { useNavigate } from "react-router-dom";
import LoginWrapper from "../login/LoginWrapper";
import styles from "./NotFoundPageStyle.module.scss";
import Button from "../../ui/components/button/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onGoBack = () => navigate(-1);

  return <LoginWrapper>
    <div className={styles.container}>
      <h1 className="title">Page not found</h1>
      <h3 className="subtitle">The page you requested is not found. Please check URL and try again.</h3>

      <Button label="Go back" clickHandler={onGoBack} />
    </div>
  </LoginWrapper>;
}

export default NotFoundPage;

