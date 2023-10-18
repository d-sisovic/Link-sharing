import { IFirebaseLink } from "../../../../ts/models/firebase-link.model";
import { ILinkWrapperFormValidity } from "./link-wrapper-form-validity.model";
import { AvailablePlatform } from "../../../../ts/enums/available-platform.enum";

export interface ILinkContent {
    newFirebaseLinks: IFirebaseLink[];
    formValidity: ILinkWrapperFormValidity[];

    onRemoveLink: (linkId: string) => Promise<void>;
    formValidityHandler: (formValues: [AvailablePlatform, string], valid: boolean, dirty: boolean, id: string) => void;
}
