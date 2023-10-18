import { IInputForm } from "./input-form.model";
import { IInputAttribute } from "./input-attribute.model";

export interface IInput {
    inputForm: IInputForm;
    children: React.ReactNode;
    expandRowDesktop?: boolean;
    inputAttribute: IInputAttribute;
}