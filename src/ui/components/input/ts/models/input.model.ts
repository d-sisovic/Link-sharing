export interface IInput {
    label: string;
    haveError: boolean;
    placeholder: string;
    type: "text" | "password" | "email";

    children: React.ReactNode;
}