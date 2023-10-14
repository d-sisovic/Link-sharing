import { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import DashboardWrapper from "./DashboardWrapper";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import link from "../../assets/images/icon-links-header.svg";
import logo from "../../assets/images/logo-devlinks-small.svg";
import preview from "../../assets/images/icon-preview-header.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import profile from "../../assets/images/icon-profile-details-header.svg";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== RoutePaths.HOME) { return; }

    navigate(RoutePaths.LINK);
  }, [navigate, location.pathname]);
  
  return <div className={styles.container}>
    <nav className={styles.nav}>
      <img src={logo} alt="logo" />

      <div className={styles['nav__subgrid']}>
        <NavLink to={RoutePaths.LINK} className={({ isActive }) => `${styles['nav__subgrid__link']} ${isActive ? styles['nav__subgrid__link--active'] : ''}`}>
          <img src={link} alt="link" />
        </NavLink>

        <NavLink to={RoutePaths.PROFILE} className={({ isActive }) => `${styles['nav__subgrid__link']} ${isActive ? styles['nav__subgrid__link--active'] : ''}`}>
          <img src={profile} alt="profile" />
        </NavLink>
      </div>

      <img src={preview} alt="preview" className={styles.preview} />
    </nav>

    <main className={styles.main}>
      <DashboardWrapper></DashboardWrapper>
    </main>
  </div>;
}

export default Dashboard;

