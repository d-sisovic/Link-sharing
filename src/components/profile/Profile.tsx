import ProfileForm from "./ProfileForm";
import { toastrConfig } from "../../util";
import styles from "./Profile.module.scss";
import auth, { db } from "../../../firebase";
import ProfilePicture from "./ProfilePicture";
import PhoneWrapper from "../phone/PhoneWrapper";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Firebase } from "../../ts/enums/firebase.enum";
import { updateNameEmail } from "../../store/auth-store";
import { AppDispatch, RootState } from "../../store/store";
import { IProfileForm } from "./ts/models/profile-form.model";
import { IProfileState } from "./ts/models/profile-state.model";
import { User, updateEmail, updateProfile } from "firebase/auth";
import commonStyles from "../../styles/common/link-profile.module.scss";
import { IProfileFormValue } from "./ts/models/profile-form-value.model";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [formState, setFormState] = useState<IProfileState | null>(null);
    const profileFormRef = useRef<React.ForwardRefExoticComponent<IProfileForm & React.RefAttributes<unknown>>>();

    const profileFormStateHandler = useCallback((formValues: IProfileFormValue, isDirty: boolean, isValid: boolean) => {
        setFormState(previousState => ({ ...previousState, formValues, isDirty, isValid }));
    }, []);

    const onSaveForm = async () => {
        const { firstName, lastName, email } = (formState as IProfileState).formValues;

        try {
            const currentUser = auth.currentUser as User;
            const displayName = `${firstName}.${lastName}`;
            const docRef = doc(db, Firebase.USERS, currentUser.uid);

            await updateEmail(currentUser, email);
            await updateProfile(currentUser, { displayName });
            await updateDoc(doc(db, Firebase.USERS, docRef.id), { displayName, email });

            dispatch(updateNameEmail({ displayName, email }));

            (profileFormRef.current as unknown as { resetForm: () => void }).resetForm();

            toast.success('Your changes have been successfully saved.', toastrConfig);
        } catch {
            toast.error('Error saving form. Please try again!', toastrConfig);
        }
    };

    const formDisabled = !formState || !formState.isValid || !formState.isDirty;

    return <>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <PhoneWrapper>
            <div className={commonStyles.container}>
                <h1 className="title">Profile Details</h1>

                <h3 className="subtitle">Add your details to create a personal touch to your profile.</h3>

                <div className={`${commonStyles.subcontainer} ${styles.subcontainer}`}>
                    <ProfilePicture />

                    <ProfileForm user={user as User} formStateHandler={profileFormStateHandler} ref={profileFormRef} />
                </div>
            </div>

            <div className={commonStyles.footer}>
                <div className={commonStyles['footer__wrapper']}>
                    <Button disabled={formDisabled} label="Save" clickHandler={onSaveForm} />
                </div>
            </div>
        </PhoneWrapper>
    </>;
}

export default Profile;
