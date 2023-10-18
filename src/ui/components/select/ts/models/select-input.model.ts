import { ISelectItem } from "./select-item.model";

export interface ISelectInput {
    dropdownVisible: boolean;
    activeItem: ISelectItem | null;

    onToggleExpand: () => void;
    setDropdownVisible: (state: boolean) => void;
}
