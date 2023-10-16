import { useEffect } from "react";
import auth from "../../../firebase";
import styles from "./Dashboard.module.scss";
import DashboardWrapper from "./DashboardWrapper";
import Button from "../../ui/components/button/Button";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import link from "../../assets/images/icon-links-header.svg";
import preview from "../../assets/images/icon-preview-header.svg";
import mobileLogo from "../../assets/images/logo-devlinks-small.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import desktopLogo from "../../assets/images/logo-devlinks-large.svg";
import profile from "../../assets/images/icon-profile-details-header.svg";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePreviewClick = () => navigate(RoutePaths.PREVIEW + `/${auth.currentUser?.uid}`);

  useEffect(() => {
    if (location.pathname !== RoutePaths.HOME) { return; }

    navigate(RoutePaths.LINK);
  }, [navigate, location.pathname]);

  return <div className={styles.container}>
    <nav className={styles.nav}>
      <img src={mobileLogo} className={styles['nav__logo--mobile']} alt="mobile__logo" />

      <img src={desktopLogo} className={styles['nav__logo--desktop']} alt="desktop__logo" />

      <div className={styles.subgrid}>
        <NavLink to={RoutePaths.LINK} className={({ isActive }) => `${styles['subgrid__link']} ${isActive ? styles['subgrid__link--active'] : ''}`}>
          <img src={link} alt="link" />

          <span className={styles['subgrid__link__label']}>Links</span>
        </NavLink>

        <NavLink to={RoutePaths.PROFILE} className={({ isActive }) => `${styles['subgrid__link']} ${isActive ? styles['subgrid__link--active'] : ''}`}>
          <img src={profile} alt="profile" />

          <span className={styles['subgrid__link__label']}>Profile Details</span>
        </NavLink>
      </div>

      <div className={styles.preview}>
        <NavLink to={RoutePaths.PREVIEW + `/${auth.currentUser?.uid}`} className={styles['preview__link']}>
          <img src={preview} alt="preview" />
        </NavLink>

        <div className={styles['preview__button']}>
          <Button label="Preview" clickHandler={handlePreviewClick} outlineMode={true} />
        </div>
      </div>
    </nav>

    <main className={styles.main}>
      <DashboardWrapper></DashboardWrapper>
    </main>
  </div>;
}

export default Dashboard;

