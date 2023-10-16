import styles from "./ProfileForm.module.scss";
import { emailAsyncValidator } from "../../util";
import Card from "../../ui/components/card/Card";
import { useForm, useWatch } from "react-hook-form";
import Input from "../../ui/components/input/Input";
import { IProfileForm } from "./ts/models/profile-form.model";
import { IProfileFormValue } from "./ts/models/profile-form-value.model";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const nameValidationSchema = {
    required: "Required",
    pattern: {
        value: /^([A-Za-z\s]{1,100})$/i,
        message: "From 1 to 100 characters"
    }
};

const coreEmailValidationSchema = {
    required: "Required",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Must be valid"
    }
};

const ProfileForm = forwardRef(({ user, formStateHandler }: IProfileForm, ref) => {
    useImperativeHandle(ref, () => ({ resetForm() { reset(formValues); } }));

    const [firstName, lastName] = (user.displayName || ".").split('.');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultValues = { email: user.email, firstName, lastName } as Record<string, any>;
    const [emailValidationSchema, setEmailValidationSchema] = useState(coreEmailValidationSchema);
    const { register, reset, control, formState: { errors, isValid, isDirty } } = useForm({ mode: 'onChange', defaultValues });

    const formValues = useWatch({ control });

    useEffect(() => {
        if (!isDirty) { return; }

        const validate = user.email as string | null === formValues.email ? {} : emailAsyncValidator(formValues.email);

        setEmailValidationSchema(previousState => ({ ...previousState, validate }));
    }, [user.email, isDirty, formValues]);

    useEffect(() => {
        formStateHandler(formValues as IProfileFormValue, isDirty, isValid);
    }, [formValues, isDirty, isValid, formStateHandler]);

    return <Card>
        <div className={styles.card}>
            <Input name="firstName" label="First name*"
                errors={errors} register={register} validationSchema={nameValidationSchema}>
            </Input>

            <Input name="lastName" label="Last name*"
                errors={errors} register={register} validationSchema={nameValidationSchema}>
            </Input>

            <Input name="email" type="email" label="Email"
                errors={errors} register={register} validationSchema={emailValidationSchema}>
            </Input>
        </div>
    </Card>
});

export default ProfileForm;
