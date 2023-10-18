import auth from "../../../firebase";
import LinkContent from "./LinkContent";
import { UTIL } from "../../ts/enums/util.enum";
import PhoneWrapper from "../phone/PhoneWrapper";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { AppDispatch, RootState } from "../../store/store";
import { platformsDropdown, toastrConfig } from "../../util";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
import commonStyles from "../../styles/common/link-profile.module.scss";
import { AvailablePlatform } from "../../ts/enums/available-platform.enum";
import { filterLinks, setLinksLoading, setLinksOnSave } from "../../store/link-store";
import { ILinkWrapperFormValidity } from "./ts/models/link-wrapper-form-validity.model";
import { deleteLinkFromDb, getFormValidityValue, getLinkNotMatchingById, getUILinksAfterSave, getInitialFormValidity } from "./link-util";

const PhoneWrapperMemo = memo(PhoneWrapper);

const LinkWrapper = () => {
    const [newFirebaseLinks, setNewLinks] = useState<IFirebaseLink[]>([]);
    const [formValidity, setFormValidity] = useState<ILinkWrapperFormValidity[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { links, loading } = useSelector((state: RootState) => state.list);

    const onAddLink = useCallback(() => {
        const usedSavedPlatforms = formValidity.map(item => item.link.platform);
        const [firstUnusedPlatform] = platformsDropdown.filter(platform => !usedSavedPlatforms.includes(platform.value));

        setNewLinks(previousState => {
            const platform = firstUnusedPlatform.value;
            const id = UTIL.NEW_LINK_ID + previousState.length;

            return [{ id, platform, index: previousState.length, value: "" }, ...previousState];
        });
    }, [formValidity]);

    const addLinkDisabled = useMemo(() => platformsDropdown.length === (newFirebaseLinks.length + links.length), [links.length, newFirebaseLinks.length]);

    const formDisabled = useMemo(() => {
        const formInvalid = getFormValidityValue(formValidity, 'valid').some(value => !value);
        const formUntouched = getFormValidityValue(formValidity, 'dirty').every(value => !value);

        return formInvalid || formUntouched || (!newFirebaseLinks.length && !links.length);
    }, [formValidity, newFirebaseLinks.length, links.length]);

    const removeFormValidityEntry = (linkId: string) => {
        setFormValidity(previousState => previousState.filter(item => item.link.id !== linkId));
    };

    const formValidityHandler = useCallback((formValues: [AvailablePlatform, string], valid: boolean, dirty: boolean, id: string) => {
        const [platform, value] = formValues;

        setFormValidity(previousState => {
            const matchingItem = previousState.some(item => item.link.id === id);

            if (!matchingItem) { return [...previousState, { valid, dirty, link: { id, platform, index: previousState.length, value } }]; }

            return previousState.map(item => {
                if (item.link.id !== id) { return item; }

                return { valid, dirty, link: { ...item.link, platform, value } as IFirebaseLink };
            });
        });
    }, []);

    const onRemoveLink = useCallback(async (linkId: string) => {
        if (linkId.startsWith(UTIL.NEW_LINK_ID)) {
            setNewLinks(previousState => getLinkNotMatchingById(previousState, linkId));
            removeFormValidityEntry(linkId);
            return;
        }

        try {
            await deleteLinkFromDb(linkId, auth.currentUser?.uid || "");

            removeFormValidityEntry(linkId);
            dispatch(filterLinks({ linkId }));

            toast.success('Link successfully deleted.', toastrConfig);
        } catch {
            toast.error('Error deleting link. Please try again!', toastrConfig);
        }
    }, [dispatch]);

    const onSaveForm = useCallback(async () => {
        dispatch(setLinksLoading({ loading: true }));

        try {
            const linksUI = await getUILinksAfterSave(formValidity);

            if (newFirebaseLinks.length) { setNewLinks([]); }

            dispatch(setLinksOnSave({ loading: false, links: linksUI }));

            toast.success('Link/s successfully created/updated.', toastrConfig);
        } catch {
            dispatch(setLinksLoading({ loading: false }));
            toast.error('Error adding link. Please try again!', toastrConfig);
        }
    }, [dispatch, formValidity, newFirebaseLinks.length]);

    useEffect(() => {
        if (loading) { return; }

        setFormValidity(getInitialFormValidity(links));
    }, [loading, links]);

    const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);

    const SaveFormButtonMemo = useMemo(() => <Button disabled={formDisabled} label="Save" clickHandler={onSaveForm} />, [formDisabled, onSaveForm]);

    const AddLinkButtonMemo = useMemo(() => <Button disabled={addLinkDisabled}
        label="+ Add new link" outlineMode={true} clickHandler={onAddLink} />, [addLinkDisabled, onAddLink]);

    const LinkContentMemo = useMemo(() => <LinkContent newFirebaseLinks={newFirebaseLinks} formValidity={formValidity}
        onRemoveLink={onRemoveLink} formValidityHandler={formValidityHandler} />, [formValidity, newFirebaseLinks, onRemoveLink, formValidityHandler]);

    const PhoneWrapperContentMemo = useMemo(() => {
        return <>
            {ToastrMemo}

            <div className={commonStyles.container}>
                <h1 className="title">Customize your links</h1>

                <h3 className="subtitle">Add/edit/remove links below and then share all your profiles with the world!</h3>

                {AddLinkButtonMemo}

                {LinkContentMemo}
            </div>

            <div className={commonStyles.footer}>
                <div className={commonStyles['footer__wrapper']}>{SaveFormButtonMemo}</div>
            </div>
        </>
    }, [AddLinkButtonMemo, LinkContentMemo, SaveFormButtonMemo, ToastrMemo]);

    return <PhoneWrapperMemo children={PhoneWrapperContentMemo} />;
}

export default LinkWrapper;
