import styles from "./Phone.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PreviewLinkList from "../preview/PreviewLinkList";
import phoneSvg from "../../assets/images/illustration-phone-mockup.svg";

const Phone = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { links, loading } = useSelector((state: RootState) => state.list);

    return <div className={styles.container}>
        <img src={phoneSvg} alt="phone" />

        {user && <>
            {user.photoURL && <img src={user.photoURL} alt="profile" className={styles['container__profile']} />}

            <h1 className={styles['container__name']}>{(user.displayName || "").replace(".", " ")}</h1>

            <span className={styles['container__email']}>{user.email}</span>
        </>}

        {!loading && <div className={styles['container__list']}>
            <PreviewLinkList links={links} previewMode={true} />
        </div>}
    </div>;
};

export default Phone;
