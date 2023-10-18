import { db } from "../../../firebase";
import { toastrConfig } from "../../util";
import styles from "./Preview.module.scss";
import PreviewLinkList from "./PreviewLinkList";
import { doc, getDoc } from "firebase/firestore";
import { fetchLinks } from "../../store/link-store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import { Firebase } from "../../ts/enums/firebase.enum";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../ui/components/loading/Loading";
import { AppDispatch, RootState } from "../../store/store";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { IUserPreview } from "./ts/models/user-preview.model";
import { useEffect, useCallback, useState, useMemo } from "react";

const initialUserPreview = { loading: true, email: "", photoURL: "", displayName: "" };

const Preview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { links } = useSelector((state: RootState) => state.list);

  const { id: userId } = useParams();
  const [userPreviewData, setUserPreviewData] = useState<IUserPreview>(initialUserPreview);

  const onNavigate = useCallback((url: string) => navigate(url), [navigate]);

  const onShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('The link has been copied to your clipboard!', toastrConfig);
  }, []);

  const fetchUserPreviewData = useCallback(async () => {
    try {
      const coreUserData = (await getDoc(doc(db, Firebase.USERS, userId as string))).data();

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

  const PreviewLinkListMemo = useMemo(() => <PreviewLinkList links={links} />, [links]);
  const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);
  const ShareLinkButtonMemo = useMemo(() => <Button label="Share Link" clickHandler={onShareLink} />, [onShareLink]);
  const BackToEditorButtonMemo = useMemo(() => <Button label="Back to Editor" outlineMode={true} clickHandler={() => onNavigate(`/${RoutePaths.PROFILE}`)} />, [onNavigate]);

  useEffect(() => {
    dispatch(fetchLinks(userId || ""));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserPreviewData();
  }, [fetchUserPreviewData]);

  if (userPreviewData.loading) { return <Loading />; }

  return (
    <>
      {ToastrMemo}

      <div className={styles.container}>
        <div className={styles.header}>
          {user !== null && <div className={styles['header__wrapper']}>
            <div>{BackToEditorButtonMemo}</div>

            <div>{ShareLinkButtonMemo}</div>
          </div>}
        </div>

        <div className={styles.body}>
          <div className={styles['body__profile']}>
            <img src={userPreviewData.photoURL} alt="profile image" />

            <h1 className={styles['body__name']}>{userPreviewData.displayName}</h1>

            <h3 className={styles['body__email']}>{userPreviewData.email}</h3>
          </div>

          <div className={styles['body__links']}>{PreviewLinkListMemo}</div>
        </div>
      </div>
    </>
  );
}

export default Preview;