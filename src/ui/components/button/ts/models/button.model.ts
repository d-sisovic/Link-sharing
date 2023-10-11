export interface IButton {
    label: string;
    disabled: boolean;
    outlineMode: boolean;

    clickHandler: () => void;
}
