import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { IFirebaseLink } from "../../../../ts/models/firebase-link.model";
import { ILinkWrapperFormValidity } from "./link-wrapper-form-validity.model";
import { AvailablePlatform } from "../../../../ts/enums/available-platform.enum";

export interface ILinkItem {
    index: number;
    link: IFirebaseLink;
    formValidity: ILinkWrapperFormValidity[];
    dragProps: DraggableProvidedDragHandleProps | null;

    removeLinkHandler?: (linkId: string) => void;
    formValidityHandler: (data: [AvailablePlatform, string], isValid: boolean, isDirty: boolean, id: string) => void;
}