import { IFirebaseLink } from "../../../../ts/models/firebase-link.model";
import { ILinkWrapperFormValidity } from "./link-wrapper-form-validity.model";
import { AvailablePlatform } from "../../../../ts/enums/available-platform.enum";

export interface ILinkList {
    baseIndex: number;
    links: IFirebaseLink[];
    formValidity: ILinkWrapperFormValidity[];
    
    removeLinkHandler: (linkId: string) => void;
    formValidityHandler: (data: [AvailablePlatform, string], isValid: boolean, isDirty: boolean, id: string) => void;
}
