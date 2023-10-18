import ProfileForm from "./ProfileForm";
import { toastrConfig } from "../../util";
import styles from "./Profile.module.scss";
import auth, { db } from "../../../firebase";
import ProfilePicture from "./ProfilePicture";
import PhoneWrapper from "../phone/PhoneWrapper";
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Firebase } from "../../ts/enums/firebase.enum";
import { updateUserData } from "../../store/auth-store";
import { AppDispatch, RootState } from "../../store/store";
import { IProfileForm } from "./ts/models/profile-form.model";
import { IProfileState } from "./ts/models/profile-state.model";
import { User, updateEmail, updateProfile } from "firebase/auth";
import { useCallback, useState, useRef, useMemo, memo } from "react";
import commonStyles from "../../styles/common/link-profile.module.scss";
import { IProfileFormValue } from "./ts/models/profile-form-value.model";

const PhoneWrapperMemo = memo(PhoneWrapper);

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [formState, setFormState] = useState<IProfileState | null>(null);
    const profileFormRef = useRef<React.ForwardRefExoticComponent<IProfileForm & React.RefAttributes<unknown>>>();

    const profileFormStateHandler = useCallback((formValues: IProfileFormValue, isDirty: boolean, isValid: boolean) => {
        setFormState(previousState => ({ ...previousState, formValues, isDirty, isValid }));
    }, []);

    const onSaveForm = useCallback(async () => {
        const { firstName, lastName, email } = (formState as IProfileState).formValues;

        try {
            const currentUser = auth.currentUser as User;
            const displayName = `${firstName}.${lastName}`;

            await updateEmail(currentUser, email);
            await updateProfile(currentUser, { displayName });
            await updateDoc(doc(db, Firebase.USERS, doc(db, Firebase.USERS, currentUser.uid).id), { displayName, email });

            dispatch(updateUserData({ displayName, email }));

            (profileFormRef.current as unknown as { resetForm: () => void }).resetForm();

            toast.success('Your changes have been successfully saved.', toastrConfig);
        } catch {
            toast.error('Error saving form. Please try again!', toastrConfig);
        }
    }, [dispatch, formState]);

    const formDisabled = !formState || !formState.isValid || !formState.isDirty;

    const ProfilePictureMemo = useMemo(() => <ProfilePicture />, []);
    const ProfileFormMemo = useMemo(() => <ProfileForm user={user as User}
        formStateHandler={profileFormStateHandler} ref={profileFormRef} />, [profileFormStateHandler, user]);
    const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);
    const ButtonMemo = useMemo(() => <Button disabled={formDisabled} label="Save" clickHandler={onSaveForm} />, [formDisabled, onSaveForm]);

    const PhoneWrapperChildren = useMemo(() => <>
        {ToastrMemo}

        <div className={commonStyles.container}>
            <h1 className="title">Profile Details</h1>

            <h3 className="subtitle">Add your details to create a personal touch to your profile.</h3>

            <div className={`${commonStyles.subcontainer} ${styles.subcontainer}`}>
                {ProfilePictureMemo}

                {ProfileFormMemo}
            </div>
        </div>

        <div className={commonStyles.footer}>
            <div className={commonStyles['footer__wrapper']}>{ButtonMemo}</div>
        </div>
    </>, [ButtonMemo, ProfileFormMemo, ProfilePictureMemo, ToastrMemo]);

    return <PhoneWrapperMemo children={PhoneWrapperChildren} />;
}

export default Profile;
