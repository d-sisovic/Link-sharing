import { ISelectItem } from "./select-item.model";

export interface ISelectOptions {
    activeOption: string;
    options: ISelectItem[];

    onChange: (...event: unknown[]) => void;
    onSelectOption: (onChange: (value: string) => void, value: string) => void;
}
