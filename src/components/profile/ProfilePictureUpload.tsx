import styles from "./ProfilePictureUpload.module.scss";
import Spinner from "../../ui/components/spinner/Spinner";
import uploadSvg from "../../assets/images/icon-upload-image.svg";
import { IProfilePictureUpload } from "./ts/models/profile-picture-upload.model";

const ProfilePictureUpload = ({ imageState, handleImageUpload }: IProfilePictureUpload) => {
    return <div className={`${styles.container} ${imageState.imageURL ? styles['container--change'] : ''}`} onClick={handleImageUpload}>
        {imageState.uploading && <div className={styles['container__progress']}><Spinner size={4} /></div>}

        <img src={uploadSvg} alt="upload" className={styles['container__image']} />

        {!imageState.imageURL && <span className={styles['container__text']}>+ Upload Image</span>}

        {imageState.imageURL && <>
            <span className={styles['container__text']}>Change image</span>
            <img src={imageState.imageURL} alt="profile" className={styles['container__profile']} />
        </>}
    </div>
}

export default ProfilePictureUpload;
