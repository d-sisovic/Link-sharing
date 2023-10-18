import auth, { db } from "../../../firebase";
import { UTIL } from "../../ts/enums/util.enum";
import { Firebase } from "../../ts/enums/firebase.enum";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";
import { ILinkWrapperFormValidity } from "./ts/models/link-wrapper-form-validity.model";
import { deleteDoc, doc, addDoc, collection, setDoc, updateDoc } from "firebase/firestore";

/**
 * Firebase actions
 */

export const deleteLinkFromDb = (linkId: string, userId: string) => {
    return deleteDoc(doc(db, Firebase.COLLECTION + userId, linkId));
};

export const addLinkToDb = (data: Record<string, string | number>, userId: string) => {
    return addDoc(collection(db, Firebase.COLLECTION + userId), data);
};

export const setLinkToDb = (link: IFirebaseLink, index: number, userId: string) => {
    const { id, ...rest } = link;

    return setDoc(doc(db, Firebase.COLLECTION + userId, id), { ...rest, index });
};

export const updateLinkToDb = (linkId: string, data: Record<string, string | number>, userId: string) => {
    return updateDoc(doc(db, Firebase.COLLECTION + userId, linkId), data);
};

/**
 * Ordinary actions
 */

export const getFormValidityValue = (formValidity: ILinkWrapperFormValidity[], key: keyof ILinkWrapperFormValidity) => {
    return formValidity.map(item => item[key]);
};

export const getChangedValidLinks = (formValidity: ILinkWrapperFormValidity[]) => {
    return formValidity.reduce((accumulator, item) => {
        const { dirty, valid, link } = item;

        return dirty && valid ? [...accumulator, link] : accumulator;
    }, [] as IFirebaseLink[]);
};

export const getLinkNotMatchingById = (links: IFirebaseLink[], linkId: string) => {
    return links.filter(link => link.id !== linkId);
};

export const getFirebaseRequests = (linksToSave: IFirebaseLink[], userId: string) => {
    return linksToSave.map(link => {
        const { id, ...rest } = link;
        const data = id.startsWith(UTIL.NEW_LINK_ID) ? addLinkToDb(rest, userId) : updateLinkToDb(link.id, rest, userId);

        return { id, data };
    });
};

export const getInitialFormValidity = (links: IFirebaseLink[]) => {
    return links.map(link => ({ link, valid: true, dirty: false }));
};

export const getUILinksAfterSave = async (formValidity: ILinkWrapperFormValidity[]) => {
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

export const reorderLinks = (links: IFirebaseLink[], startIndex: number, endIndex: number) => {
    const linksCopy = Array.from(links);
    const [removed] = linksCopy.splice(startIndex, 1);
    linksCopy.splice(endIndex, 0, removed);

    return linksCopy.map((link, index) => ({ ...link, index }));
};