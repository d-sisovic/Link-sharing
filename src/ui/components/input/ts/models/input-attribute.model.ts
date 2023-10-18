import { INPUT_TYPE } from "../../../../../ts/enums/input-type.enum";

export interface IInputAttribute {
    name: string;
    label: string;
    type: INPUT_TYPE;
    placeholder: string;
}
