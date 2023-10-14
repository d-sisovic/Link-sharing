import Card from "../../ui/components/card/Card";
import styles from "./ProfilePicture.module.scss";
import auth, { storage } from "../../../firebase";
import { User, updateProfile } from "firebase/auth";
import Spinner from "../../ui/components/spinner/Spinner";
import { useAuthData } from "../../context/AuthContextData";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import uploadSvg from "../../assets/images/icon-upload-image.svg";
import { IProfilePicture } from './ts/models/profile-picture.model';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";

const ProfilePicture = () => {
    const { user } = useAuthData();
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [imageState, setImageState] = useState<IProfilePicture>({ uploading: true, invalid: false, imageURL: null });

    const handleImageUpload = () => {
        if (!inputFileRef.current) { return; }

        inputFileRef.current.click();
    };

    useEffect(() => {
        setImageState({ uploading: false, invalid: false, imageURL: user?.photoURL as string | null });
    }, [user]);

    const resetInputFileRef = () => (inputFileRef.current as HTMLInputElement).value = "";

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const [firstFile] = event.target.files as FileList;

        reader.readAsDataURL(firstFile);
        reader.onload = event => {
            setImageState(previousState => ({ ...previousState, uploading: true }));

            const image = new Image();
            image.src = (event.target as FileReader).result as string;

            image.onload = async () => {
                try {
                    const width = image.width;
                    const height = image.height;
                    const invalid = height > 1024 || width > 1024;

                    setImageState({ invalid, uploading: false, imageURL: null });

                    if (invalid) { return; }
         
                    const imageRef = storageRef(storage, `profile/${user?.email}/profileImage`);
                    const imageURL = await getDownloadURL((await uploadBytes(imageRef, firstFile)).ref);
                    await updateProfile(auth.currentUser as User, { photoURL: imageURL });

                    setImageState({ invalid: false, uploading: false, imageURL });
                    resetInputFileRef();
                } catch {
                    setImageState({ invalid: true, uploading: false, imageURL: null });
                    resetInputFileRef();
                }
            };
        };
    };

    return <Card>
        <input type="file" name="image" accept=".png,.jpg" className={styles.file} ref={inputFileRef} onChange={handleFileChange} />

        <div className={styles.container} onClick={handleImageUpload}>
            <h1 className={`${styles.heading}`}>Profile picture</h1>

            <div className={`${styles['container__upload']} ${imageState.imageURL ? styles['container__upload--change'] : ''}`}>
                {imageState.uploading && <div className={styles['container__upload__progress']}><Spinner size={4} /></div>}
                <img src={uploadSvg} alt="upload" className={styles['container__upload__image']} />

                {!imageState.imageURL && <span className={styles['container__upload__text']}>+ Upload Image</span>}

                {imageState.imageURL && <>
                    <span className={styles['container__upload__text']}>Change image</span>
                    <img src={imageState.imageURL} alt="profile" className={styles.profile} />
                </>}
            </div>
        </div>

        {imageState.invalid && <p className={`${styles.note} ${styles['note--invalid']}`}>
            Error uploading image. Image doesn't meet upload criteria or there was some unknown error.
        </p>}

        <p className={styles.note}>Image must be below 1024x1024px. Use PNG or JPG format.</p>
    </Card>;
}

export default ProfilePicture;
