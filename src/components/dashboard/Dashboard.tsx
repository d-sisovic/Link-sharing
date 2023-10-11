import { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import DashboardWrapper from "./DashboardWrapper";
import { Routes } from "../../ts/enums/routes.enum";
import { NavLink, useNavigate } from "react-router-dom";
import link from "../../assets/images/icon-links-header.svg";
import logo from "../../assets/images/logo-devlinks-small.svg";
import preview from "../../assets/images/icon-preview-header.svg";
import profile from "../../assets/images/icon-profile-details-header.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => navigate(Routes.LINK), [navigate]);

  return <div className={styles.container}>
    <nav className={styles.nav}>
      <img src={logo} alt="logo" />

      <div className={styles['nav__subgrid']}>
        <NavLink to={Routes.LINK} className={({ isActive }) => `${styles['nav__subgrid__link']} ${isActive ? styles['nav__subgrid__link--active'] : ''}`}>
          <img src={link} alt="link" />
        </NavLink>

        <span className={styles['nav__subgrid__link']}><img src={profile} alt="profile" /></span>
      </div>

      <img src={preview} alt="preview" className={styles.preview} />
    </nav>

    <main className={styles.main}>
      <DashboardWrapper></DashboardWrapper>
    </main>
  </div>;
}

export default Dashboard;

