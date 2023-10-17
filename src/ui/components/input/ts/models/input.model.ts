import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IInput {
    name: string;
    label: string;
    placeholder?: string;
    validationSchema: object;
    expandRowDesktop?: boolean;
    errors: FieldErrors<FieldValues>;
    type?: "text" | "password" | "email";
    register: UseFormRegister<FieldValues>;

    children: React.ReactNode;
}