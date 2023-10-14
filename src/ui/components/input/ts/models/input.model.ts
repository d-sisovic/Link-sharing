import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IInput {
    name: string;
    label: string;
    placeholder?: string;
    validationSchema: object;
    errors: FieldErrors<FieldValues>;
    type?: "text" | "password" | "email";
    register: UseFormRegister<FieldValues>;

    children: React.ReactNode;
}