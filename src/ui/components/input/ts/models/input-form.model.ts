import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export interface IInputForm {
    errors: FieldError;
    validationSchema: object;
    register: UseFormRegister<FieldValues>;
}
