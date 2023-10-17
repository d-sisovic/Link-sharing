import { User } from "firebase/auth";
import { IProfileFormValue } from "./profile-form-value.model";

export interface IProfileForm {
    user: User;
    formStateHandler: (formValues: IProfileFormValue, isDirty: boolean, isValid: boolean) => void;
}
