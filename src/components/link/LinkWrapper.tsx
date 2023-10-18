import LinkList from "./LinkList";
import LinkIntro from "./LinkIntro";
import auth, { db } from "../../../firebase";
import styles from "./LinkWrapper.module.scss";
import { DropResult } from "@hello-pangea/dnd";
import { UTIL } from "../../ts/enums/util.enum";
import PhoneWrapper from "../phone/PhoneWrapper";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { Firebase } from "../../ts/enums/firebase.enum";
import Spinner from "../../ui/components/spinner/Spinner";
import { AppDispatch, RootState } from "../../store/store";
import { platformsDropdown, toastrConfig } from "../../util";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";
import commonStyles from "../../styles/common/link-profile.module.scss";
import { AvailablePlatform } from "../../ts/enums/available-platform.enum";
import { ILinkWrapperFormValidity } from "./ts/models/link-wrapper-form-validity.model";
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { filterLinks, setLinks, setLinksLoading, setLinksOnSave } from "../../store/link-store";

const getFormValidityValue = (formValidity: ILinkWrapperFormValidity[], key: keyof ILinkWrapperFormValidity) => {
    return formValidity.map(item => item[key]);
};

const getChangedValidLinks = (formValidity: ILinkWrapperFormValidity[]) => {
    return formValidity.reduce((accumulator, item) => {
        const { dirty, valid, link } = item;

        return dirty && valid ? [...accumulator, link] : accumulator;
    }, [] as IFirebaseLink[]);
};

const deleteLinkFromDb = (linkId: string, userId: string) => {
    return deleteDoc(doc(db, Firebase.COLLECTION + userId, linkId));
};

const addLinkToDb = (data: Record<string, string | number>, userId: string) => {
    return addDoc(collection(db, Firebase.COLLECTION + userId), data);
};

const setLinkToDb = (link: IFirebaseLink, index: number, userId: string) => {
    const { id, ...rest } = link;

    return setDoc(doc(db, Firebase.COLLECTION + userId, id), { ...rest, index });
};

const updateLinkToDb = (linkId: string, data: Record<string, string | number>, userId: string) => {
    return updateDoc(doc(db, Firebase.COLLECTION + userId, linkId), data);
};

const getLinkNotMatchingById = (links: IFirebaseLink[], linkId: string) => {
    return links.filter(link => link.id !== linkId);
};

const getFirebaseRequests = (linksToSave: IFirebaseLink[], userId: string) => {
    return linksToSave.map(link => {
        const { id, ...rest } = link;
        const data = id.startsWith(UTIL.NEW_LINK_ID) ? addLinkToDb(rest, userId) : updateLinkToDb(link.id, rest, userId);

        return { id, data };
    });
};

const getInitialFormValidity = (links: IFirebaseLink[]) => {
    return links.map(link => ({ link, valid: true, dirty: false }));
};

const getUILinksAfterSave = async (formValidity: ILinkWrapperFormValidity[]) => {
    const userId = auth.currentUser?.uid || "";
    const changedValidLinks = getChangedValidLinks(formValidity);
    const firebaseRequests = getFirebaseRequests(changedValidLinks, userId);

    const saveResponse = await Promise.all(firebaseRequests.map(request => request.data));
    const keysResponse = firebaseRequests.map((request, index) => ({ id: request.id, newId: saveResponse[index]?.id || request.id }));

    return changedValidLinks.map(link => {
        const matchingId = keysResponse.find(keyItem => keyItem.id === link.id);

        return !matchingId ? link : { ...link, id: matchingId.newId };
    });
};

const reorderLinks = (links: IFirebaseLink[], startIndex: number, endIndex: number) => {
    const linksCopy = Array.from(links);
    const [removed] = linksCopy.splice(startIndex, 1);
    linksCopy.splice(endIndex, 0, removed);

    return linksCopy.map((link, index) => ({ ...link, index }));
};

const LinkWrapper = () => {
    const [newFirebaseLinks, setNewLinks] = useState<IFirebaseLink[]>([]);
    const [formValidity, setFormValidity] = useState<ILinkWrapperFormValidity[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { links, loading } = useSelector((state: RootState) => state.list);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) { return; }

        const userId = auth.currentUser?.uid || "";
        const reorderedLinks = reorderLinks(links, result.source.index, result.destination.index);

        try {
            dispatch(setLinks({ links: reorderedLinks }));
            await Promise.all(reorderedLinks.map(link => deleteLinkFromDb(link.id, userId)));
            await Promise.all(reorderedLinks.map((link, index) => setLinkToDb(link, index, userId)));
        } catch {
            dispatch(setLinks({ links }));
            toast.error('Error reordering links. Please try again!', toastrConfig);
        }
    };

    const onAddLink = () => {
        const usedSavedPlatforms = formValidity.map(item => item.link.platform);
        const [firstUnusedPlatform] = platformsDropdown.filter(platform => !usedSavedPlatforms.includes(platform.value));

        setNewLinks(previousState => {
            const platform = firstUnusedPlatform.value;
            const id = UTIL.NEW_LINK_ID + previousState.length;

            return [{ id, platform, index: previousState.length, value: "" }, ...previousState];
        });
    };

    const formDisabled = useMemo(() => {
        const formInvalid = getFormValidityValue(formValidity, 'valid').some(value => !value);
        const formUntouched = getFormValidityValue(formValidity, 'dirty').every(value => !value);

        return formInvalid || formUntouched || (!newFirebaseLinks.length && !links.length);
    }, [formValidity, newFirebaseLinks.length, links.length]);

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

    const removeFormValidityEntr = (linkId: string) => {
        setFormValidity(previousState => previousState.filter(item => item.link.id !== linkId));
    };

    const onRemoveLink = useCallback(async (linkId: string) => {
        if (linkId.startsWith(UTIL.NEW_LINK_ID)) {
            setNewLinks(previousState => getLinkNotMatchingById(previousState, linkId));
            removeFormValidityEntr(linkId);
            return;
        }

        const userId = auth.currentUser?.uid || "";

        try {
            await deleteLinkFromDb(linkId, userId);

            removeFormValidityEntr(linkId);
            dispatch(filterLinks({ linkId }));

            toast.success('Link successfully deleted.', toastrConfig);
        } catch {
            toast.error('Error deleting link. Please try again!', toastrConfig);
        }
    }, [dispatch]);

    const onSaveForm = async () => {
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
    };

    useEffect(() => {
        if (loading) { return; }

        setFormValidity(getInitialFormValidity(links));
    }, [loading, links]);

    return <>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <PhoneWrapper>
            <div className={commonStyles.container}>
                <h1 className="title">Customize your links</h1>

                <h3 className="subtitle">Add/edit/remove links below and then share all your profiles with the world!</h3>

                <Button disabled={platformsDropdown.length === (newFirebaseLinks.length + links.length)} label="+ Add new link" outlineMode={true} clickHandler={onAddLink} />

                <div className={`${commonStyles.subcontainer} ${!loading && links.length !== 0 ? `${styles['subcontainer--links']}` : ''} ${loading && `${styles['subcontainer--loader']}`}`}>
                    {loading && <Spinner size={4} />}

                    {!loading && <>
                        {newFirebaseLinks.length === 0 && links.length === 0 && <LinkIntro />}

                        {newFirebaseLinks.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={links.length} removeLinkHandler={onRemoveLink} formValidity={formValidity}
                            formValidityHandler={formValidityHandler} links={newFirebaseLinks} />}

                        {links.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={0} removeLinkHandler={onRemoveLink}
                            formValidity={formValidity} formValidityHandler={formValidityHandler} links={links} />}
                    </>}
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

export default LinkWrapper;
