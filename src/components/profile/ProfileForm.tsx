import styles from "./ProfileForm.module.scss";
import { emailAsyncValidator } from "../../util";
import Card from "../../ui/components/card/Card";
import Input from "../../ui/components/input/Input";
import { INPUT_TYPE } from "../../ts/enums/input-type.enum";
import { useWindowSize } from "../../hooks/use-window-size";
import { IProfileForm } from "./ts/models/profile-form.model";
import { FieldError, useForm, useWatch } from "react-hook-form";
import { IProfileFormValue } from "./ts/models/profile-form-value.model";
import { useEffect, useState, forwardRef, useImperativeHandle, useMemo, memo } from "react";

const emailInputAttribute = { name: "email", label: "Email", type: INPUT_TYPE.EMAIL, placeholder: "" };
const lastNameInputAttribute = { name: "lastName", label: "Last name*", type: INPUT_TYPE.TEXT, placeholder: "" };
const firstNameInputAttribute = { name: "firstName", label: "First name*", type: INPUT_TYPE.TEXT, placeholder: "" };

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

const CardMemo = memo(Card);

const ProfileForm = forwardRef(({ user, formStateHandler }: IProfileForm, ref) => {
    useImperativeHandle(ref, () => ({ resetForm() { reset(formValues); } }));

    const [width] = useWindowSize();
    const matchesDesktopMq = width >= 768;
    const [firstName, lastName] = (user.displayName || ".").split('.');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultValues = { email: user.email, firstName, lastName } as Record<string, any>;
    const [emailValidationSchema, setEmailValidationSchema] = useState(coreEmailValidationSchema);
    const { register, reset, control, formState: { errors, isValid, isDirty } } = useForm({ mode: 'onChange', defaultValues });

    const formValues = useWatch({ control });

    const emailErrors = errors[emailInputAttribute.name] as FieldError;
    const lastNameErrors = errors[lastNameInputAttribute.name] as FieldError;
    const firstNameErrors = errors[firstNameInputAttribute.name] as FieldError;

    const LastNameFieldInputFormMemo = useMemo(() => ({ register, errors: lastNameErrors, validationSchema: nameValidationSchema }), [lastNameErrors, register]);
    const FirstNameFieldInputFormMemo = useMemo(() => ({ register, errors: firstNameErrors, validationSchema: nameValidationSchema }), [firstNameErrors, register]);
    const EmailFieldInputFormMemo = useMemo(() => ({ register, errors: emailErrors, validationSchema: emailValidationSchema }), [emailErrors, emailValidationSchema, register]);

    const FirstNameInputMemo = useMemo(() => <Input inputAttribute={firstNameInputAttribute}
        expandRowDesktop={matchesDesktopMq} inputForm={FirstNameFieldInputFormMemo}>
    </Input>, [FirstNameFieldInputFormMemo, matchesDesktopMq]);

    const LastNameInputMemo = useMemo(() => <Input inputAttribute={lastNameInputAttribute}
        expandRowDesktop={matchesDesktopMq} inputForm={LastNameFieldInputFormMemo}>
    </Input>, [LastNameFieldInputFormMemo, matchesDesktopMq]);

    const EmailInputMemo = useMemo(() => <Input inputAttribute={emailInputAttribute}
        expandRowDesktop={matchesDesktopMq} inputForm={EmailFieldInputFormMemo}>
    </Input>, [EmailFieldInputFormMemo, matchesDesktopMq]);

    useEffect(() => {
        if (!isDirty) { return; }

        const validate = user.email as string | null === formValues.email ? {} : emailAsyncValidator(formValues.email);

        setEmailValidationSchema(previousState => ({ ...previousState, validate }));
    }, [user.email, isDirty, formValues]);

    useEffect(() => {
        formStateHandler(formValues as IProfileFormValue, isDirty, isValid);
    }, [formValues, isDirty, isValid, formStateHandler]);

    const ContentMemo = useMemo(() => <div className={styles.card}>
        {FirstNameInputMemo}

        {LastNameInputMemo}

        {EmailInputMemo}
    </div>, [EmailInputMemo, FirstNameInputMemo, LastNameInputMemo]);

    return <CardMemo children={ContentMemo} />;
});

export default ProfileForm;
