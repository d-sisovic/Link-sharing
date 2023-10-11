import { ISelectItem } from "./select-item.model";
import { Control, FieldValues } from "react-hook-form";

export interface ISelect {
    name: string;
    label: string;
    active: string;
    options: ISelectItem[];
    control: Control<FieldValues, unknown>;
}
