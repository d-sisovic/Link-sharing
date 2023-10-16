import { db } from "../../../firebase";
import { toastrConfig } from "../../util";
import styles from "./Preview.module.scss";
import PreviewLinkList from "./PreviewLinkList";
import { doc, getDoc } from "firebase/firestore";
import Button from "../../ui/components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import { Firebase } from "../../ts/enums/firebase.enum";
import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../ui/components/loading/Loading";
import { useAuthData } from "../../context/AuthContextData";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { useFetchLinks } from "../../hooks/use-fetch-links";
import { IUserPreview } from "./ts/models/user-preview.model";

const initialUserPreview = { loading: true, email: "", photoURL: "", displayName: "" };

const Preview = () => {
  const navigate = useNavigate();
  const { user } = useAuthData();
  const { id: userId } = useParams();
  const { isLoading: isLoadingLinks, links } = useFetchLinks(userId || "");
  const [userPreviewData, setUserPreviewData] = useState<IUserPreview>(initialUserPreview);

  const onNavigate = useCallback((url: string) => navigate(url), [navigate]);

  const onShareLink = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('Link copied to clipboard.', toastrConfig);
  };

  const fetchUserPreviewData = useCallback(async () => {
    try {
      const documentReference = doc(db, Firebase.USERS, userId as string);
      const coreUserData = (await getDoc(documentReference)).data();

      if (!coreUserData) {
        onNavigate(`/${RoutePaths.LOGIN}`);
        return;
      }

      const displayName = (coreUserData?.displayName || "").replace(".", " ");

      setUserPreviewData(previousState => ({ ...previousState, ...coreUserData, loading: false, displayName }));
    } catch {
      onNavigate(`/${RoutePaths.LOGIN}`);
    }
  }, [userId, onNavigate]);

  useEffect(() => {
    fetchUserPreviewData();
  }, [fetchUserPreviewData]);

  if (isLoadingLinks || userPreviewData.loading) { return <Loading />; }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className={styles.container}>
        <div className={styles.header}>
          {user !== null && <div className={styles['header__wrapper']}>
            <div>
              <Button label="Back to Editor" outlineMode={true} clickHandler={() => onNavigate(`/${RoutePaths.PROFILE}`)} />
            </div>

            <div>
              <Button label="Share Link" clickHandler={onShareLink} />
            </div>
          </div>}
        </div>

        <div className={styles.body}>
          <div className={styles['body__profile']}>
            <img src={userPreviewData.photoURL} alt="profile image" />

            <h1 className={styles['body__name']}>{userPreviewData.displayName}</h1>

            <h3 className={styles['body__email']}>{userPreviewData.email}</h3>
          </div>

          <div className={styles['body__links']}>
            <PreviewLinkList links={links} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;