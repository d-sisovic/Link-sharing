import { IProfileFormValue } from "./profile-form-value.model";

export interface IProfileState {
    isDirty: boolean;
    isValid: boolean;
    formValues: IProfileFormValue;
}
