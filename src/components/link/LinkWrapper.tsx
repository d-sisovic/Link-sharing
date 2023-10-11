import LinkList from "./LinkList";
import LinkIntro from "./LinkIntro";
import { db } from "../../../firebase";
import styles from "./LinkWrapper.module.scss";
import { DropResult } from "@hello-pangea/dnd";
import { UTIL } from "../../ts/enums/util.enum";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../ui/components/button/Button";
import { Firebase } from "../../ts/enums/firebase.enum";
import Spinner from "../../ui/components/spinner/Spinner";
import { platformsDropdown, toastrConfig } from "../../util";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";
import { AvailablePlatform } from "../../ts/enums/available-platform.enum";
import { ILinkWrapperFormValidity } from "./ts/models/link-wrapper-form-validity.model";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const getFormValidityValue = (formValidity: ILinkWrapperFormValidity[], key: keyof ILinkWrapperFormValidity) => {
    return formValidity.map(item => item[key]);
};

const getChangedValidLinks = (formValidity: ILinkWrapperFormValidity[]) => {
    return formValidity.reduce((accumulator, item) => {
        const { dirty, valid, link } = item;

        return dirty && valid ? [...accumulator, link] : accumulator;
    }, [] as IFirebaseLink[]);
};

const deleteLinkFromDb = (linkId: string) => {
    return deleteDoc(doc(db, Firebase.COLLECTION, linkId));
};

const addLinkToDb = (data: Record<string, string>) => {
    return addDoc(collection(db, Firebase.COLLECTION), data);
};

const updateLinkToDb = (linkId: string, data: Record<string, string>) => {
    return updateDoc(doc(db, Firebase.COLLECTION, linkId), data);
};

const getLinkNotMatchingById = (links: IFirebaseLink[], linkId: string) => {
    return links.filter(link => link.id !== linkId);
};

const getFirebaseRequests = (linksToSave: IFirebaseLink[]) => {
    return linksToSave.map(link => {
        const { id, ...rest } = link;
        const data = id.startsWith(UTIL.NEW_LINK_ID) ? addLinkToDb(rest) : updateLinkToDb(link.id, rest);

        return { id, data };
    });
};

const getLinksIds = (links: IFirebaseLink[]) => {
    return links.map(link => link.id);
};

const getNewLinksToSave = (existingLinks: IFirebaseLink[], linksToSave: IFirebaseLink[]) => {
    const existingIds = getLinksIds(existingLinks);

    return linksToSave.filter(linkToSave => !existingIds.includes(linkToSave.id));
};

const getUpdatedLinksToSave = (existingLinks: IFirebaseLink[], linksToSave: IFirebaseLink[]) => {
    return existingLinks.map(link => linksToSave.find(linkToSave => link.id === linkToSave.id) || link);
};

const getUpdatedLinkForUI = (existingLinks: IFirebaseLink[], linksToSave: IFirebaseLink[]) => {
    const newLinks = getNewLinksToSave(existingLinks, linksToSave);
    const updatedLinks = getUpdatedLinksToSave(existingLinks, linksToSave);

    return [...updatedLinks, ...newLinks];
};

const getInitialFormValidity = (links: IFirebaseLink[]) => {
    return links.map(link => ({ link, valid: true, dirty: false }));
};

const getUILinksAfterSave = async (formValidity: ILinkWrapperFormValidity[]) => {
    const changedValidLinks = getChangedValidLinks(formValidity);
    const firebaseRequests = getFirebaseRequests(changedValidLinks);

    const saveResponse = await Promise.all(firebaseRequests.map(request => request.data));
    const keysResponse = firebaseRequests.map((request, index) => ({ id: request.id, newId: saveResponse[index]?.id || request.id }));

    return changedValidLinks.map(link => {
        const matchingId = keysResponse.find(keyItem => keyItem.id === link.id);

        return !matchingId ? link : { ...link, id: matchingId.newId };
    });
};

const reorder = (links: IFirebaseLink[], startIndex: number, endIndex: number) => {
    const result = Array.from(links);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const LinkWrapper = () => {
    const [newFirebaseLinks, setNewLinks] = useState<IFirebaseLink[]>([]);
    const [formValidity, setFormValidity] = useState<ILinkWrapperFormValidity[]>([]);
    const [data, setLinks] = useState<{ isLoading: boolean; links: IFirebaseLink[] }>({ isLoading: true, links: [] });

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) { return; }

        const links = reorder(data.links, result.source.index, result.destination.index);

        try {
            await Promise.all(links.map(link => deleteLinkFromDb(link.id)));
            await Promise.all(links.map(link => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...rest } = link;

                return addLinkToDb(rest);
            }));

            setLinks(previousState => ({ ...previousState, links }));
        } catch (error) {
            toast.error('Error reordering links. Please try again!', toastrConfig);
        }
    };

    const onAddLink = () => {
        const usedSavedPlatforms = formValidity.map(item => item.link.platform);
        const [firstUnusedPlatform] = platformsDropdown.filter(platform => !usedSavedPlatforms.includes(platform.value));

        setNewLinks(previousState => {
            const platform = firstUnusedPlatform.value;
            const id = UTIL.NEW_LINK_ID + previousState.length;

            return [...previousState, { id, platform, value: "" }];
        });
    };

    const formDisabled = useMemo(() => {
        const formInvalid = getFormValidityValue(formValidity, 'valid').some(value => !value);
        const formUntouched = getFormValidityValue(formValidity, 'dirty').every(value => !value);

        return formInvalid || formUntouched || (!newFirebaseLinks.length && !data.links.length);
    }, [formValidity, newFirebaseLinks.length, data.links.length]);

    const fetchLinks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, Firebase.COLLECTION));
            const links = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IFirebaseLink[];

            setLinks({ isLoading: false, links });
        } catch (error) {
            setLinks({ isLoading: false, links: [] });
            toast.error('Error fetching links. Please try again!', toastrConfig);
        }
    }

    const formValidityHandler = useCallback((formValues: [AvailablePlatform, string], valid: boolean, dirty: boolean, id: string) => {
        const [platform, value] = formValues;

        setFormValidity(previousState => {
            const matchingItem = previousState.some(item => item.link.id === id);

            if (!matchingItem) { return [...previousState, { valid, dirty, link: { id, platform, value } }]; }

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

        try {
            await deleteLinkFromDb(linkId);

            removeFormValidityEntr(linkId);
            setLinks(previousState => ({ ...previousState, links: getLinkNotMatchingById(previousState.links, linkId) }));

            toast.success('Link successfully deleted.', toastrConfig);
        } catch (error) {
            toast.error('Error deleting link. Please try again!', toastrConfig);
        }
    }, []);

    const onSaveForm = async () => {
        setLinks(previousState => ({ isLoading: true, links: previousState.links }));

        try {
            const linksUI = await getUILinksAfterSave(formValidity);

            if (newFirebaseLinks.length) { setNewLinks([]); }

            setLinks(previousState => ({ isLoading: false, links: getUpdatedLinkForUI(previousState.links, linksUI) }));

            toast.success('Link/s successfully created/updated.', toastrConfig);
        } catch (error) {
            setLinks(previousState => ({ isLoading: false, links: previousState.links }));
            toast.error('Error adding link. Please try again!', toastrConfig);
        }
    };

    useEffect(() => {
        if (data.isLoading) { return; }

        setFormValidity(getInitialFormValidity(data.links));
    }, [data.isLoading, data.links]);

    useEffect(() => {
        fetchLinks();
    }, []);

    return <>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className={styles.container}>
            <h1 className="title">Customize your links</h1>

            <h3 className="subtitle">Add/edit/remove links below and then share all your profiles with the world!</h3>

            <Button disabled={platformsDropdown.length === (newFirebaseLinks.length + data.links.length)} label="+ Add new link" outlineMode={true} clickHandler={onAddLink} />

            <div className={`${styles.subcontainer} ${!data.isLoading && data.links.length !== 0 ? `${styles['subcontainer--links']}` : ''}`}>
                {data.isLoading && <Spinner size={4} />}

                {newFirebaseLinks.length === 0 && !data.isLoading && data.links.length === 0 && <LinkIntro />}

                {newFirebaseLinks.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={data.links.length} removeLinkHandler={onRemoveLink} formValidity={formValidity}
                    formValidityHandler={formValidityHandler} links={newFirebaseLinks} />}

                {!data.isLoading && data.links.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={0} removeLinkHandler={onRemoveLink}
                    formValidity={formValidity} formValidityHandler={formValidityHandler} links={data.links} />}
            </div>
        </div>

        <div className={styles.footer}>
            <Button disabled={formDisabled} label="Save" outlineMode={false} clickHandler={onSaveForm} />
        </div>
    </>;
}

export default LinkWrapper;
