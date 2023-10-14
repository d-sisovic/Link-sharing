import { toastrConfig } from "../../util";
import styles from "./Preview.module.scss";
import { useNavigate } from "react-router-dom";
import PreviewLinkList from "./PreviewLinkList";
import Button from "../../ui/components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../ui/components/spinner/Spinner";
import Loading from "../../ui/components/loading/Loading";
import { useAuthData } from "../../context/AuthContextData";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { useFetchLinks } from "../../hooks/use-fetch-links";
import uploadSvg from "../../assets/images/icon-upload-image.svg";

const Preview = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthData();
  const { isLoading: isLoadingLinks, links } = useFetchLinks();

  const onGoToEditor = () => navigate(`/${RoutePaths.PROFILE}`);

  const onShareLink = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('Link copied to clipboard.', toastrConfig);
  };

  if (isLoading) { return <Loading />; }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className={styles.container}>
        <div className={styles['container__header']}>
          <div>
            <Button label="Back to Editor" outlineMode={true} clickHandler={onGoToEditor} />
          </div>

          <div>
            <Button label="Share Link" clickHandler={onShareLink} />
          </div>
        </div>

        <div className={styles['container__profile']}>
          {user?.photoURL && <img src={user.photoURL} alt="profile image" />}

          {!user?.photoURL && <img src={uploadSvg} alt="placeholder image" />}

          <h1 className={styles['container__name']}>{user?.displayName || "No name"}</h1>

          <h3 className={styles['container__email']}>{user?.email}</h3>
        </div>

        <div className={styles['container__links']}>
          {!isLoadingLinks && <PreviewLinkList links={links} />}

          {isLoadingLinks && <Spinner size={4} />}
        </div>
      </div>
    </>
  );
}

export default Preview;