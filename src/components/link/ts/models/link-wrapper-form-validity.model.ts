import { IFirebaseLink } from "../../../../ts/models/firebase-link.model";

export interface ILinkWrapperFormValidity {
    valid: boolean;
    dirty: boolean;
    link: IFirebaseLink;
}
