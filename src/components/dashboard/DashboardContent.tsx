import { Outlet } from "react-router-dom";
import styles from "./DashboardContent.module.scss";

const DashboardContent = () => <div className={styles.container}><Outlet></Outlet></div>;

export default DashboardContent;

