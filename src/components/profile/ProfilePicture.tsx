import Card from "../../ui/components/card/Card";
import styles from "./ProfilePicture.module.scss";
import { updateDoc, doc } from "firebase/firestore";
import { User, updateProfile } from "firebase/auth";
import auth, { db, storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Firebase } from "../../ts/enums/firebase.enum";
import { updateUserData } from "../../store/auth-store";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { AppDispatch, RootState } from "../../store/store";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { IProfilePicture } from './ts/models/profile-picture.model';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";

const ProfilePicture = () => {
    const dispatch = useDispatch<AppDispatch>();
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const [imageState, setImageState] = useState<IProfilePicture>({ uploading: true, invalid: false, imageURL: null });

    const handleImageUpload = () => {
        if (!inputFileRef.current) { return; }

        inputFileRef.current.click();
    };

    useEffect(() => {
        setImageState({ uploading: false, invalid: false, imageURL: user?.photoURL as string | null });
    }, [user?.photoURL]);

    const handleUploadError = () => {
        setImageState({ invalid: true, uploading: false, imageURL: null });
        resetInputFileRef();
    };

    const resetInputFileRef = () => (inputFileRef.current as HTMLInputElement).value = "";

    const handleImageOnload = async (firstFile: File, image: HTMLImageElement) => {
        try {
            const width = image.width;
            const height = image.height;
            const invalid = height > 1024 || width > 1024;

            setImageState({ invalid, uploading: false, imageURL: null });

            if (invalid) { return; }

            const imageRef = storageRef(storage, `profile/${user?.email}/profileImage`);
            const imageURL = await getDownloadURL((await uploadBytes(imageRef, firstFile)).ref);
            const uploadData = { photoURL: imageURL };

            await updateProfile(auth.currentUser as User, uploadData);
            await updateDoc(doc(db, Firebase.USERS, doc(db, Firebase.USERS, (auth.currentUser as User).uid).id), uploadData);
            dispatch(updateUserData(uploadData));

            setImageState({ invalid: false, uploading: false, imageURL });
            resetInputFileRef();
        } catch {
            handleUploadError();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const reader = new FileReader();
            const [firstFile] = event.target.files as FileList;

            reader.readAsDataURL(firstFile);
            reader.onload = event => {
                setImageState(previousState => ({ ...previousState, uploading: true }));

                const image = new Image();

                image.src = (event.target as FileReader).result as string;
                image.onload = async () => await handleImageOnload(firstFile, image);
            };
        } catch {
            handleUploadError();
        }
    };

    return <Card>
        <input type="file" name="image" accept=".png,.jpg" className={styles.file} ref={inputFileRef} onChange={handleFileChange} />

        <div className={styles.container}>
            <h1 className={styles.heading}>Profile picture</h1>

            <div className={styles.upload}>
                <ProfilePictureUpload imageState={imageState} handleImageUpload={handleImageUpload}></ProfilePictureUpload>

                <p className={styles.note}>Image must be below 1024x1024px. Use PNG or JPG format.</p>

                {imageState.invalid && <p className={`${styles.note} ${styles['note--invalid']}`}>
                    Error uploading image. Image doesn't meet upload criteria or there was some unknown error.
                </p>}
            </div>
        </div>
    </Card>;
}

export default ProfilePicture;
