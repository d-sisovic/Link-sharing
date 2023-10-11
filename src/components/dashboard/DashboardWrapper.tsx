import { Outlet } from "react-router-dom";
import styles from "./DashboardWrapper.module.scss";

const DashboardWrapper = () => {
  return <div className={styles.container}>
    <Outlet></Outlet>
  </div>;
}

export default DashboardWrapper;

