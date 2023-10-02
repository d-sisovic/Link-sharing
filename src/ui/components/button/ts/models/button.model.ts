export interface IButton {
    label: string;
    disabled: boolean;

    clickHandler: () => void;
}
