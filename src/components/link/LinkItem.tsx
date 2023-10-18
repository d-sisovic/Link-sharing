import styles from "./LinkItem.module.scss";
import { platformsDropdown } from "../../util";
import { UTIL } from "../../ts/enums/util.enum";
import Card from "../../ui/components/card/Card";
import Input from "../../ui/components/input/Input";
import Select from "../../ui/components/select/Select";
import { ILinkItem } from "./ts/models/link-item.model";
import linkSvg from "../../assets/images/icon-link.svg";
import rectangle from "../../assets/images/rectangle.svg";
import { IPlatform } from "../../ts/models/platform.model";
import { INPUT_TYPE } from "../../ts/enums/input-type.enum";
import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { AvailablePlatform } from "../../ts/enums/available-platform.enum";
import { Control, FieldError, FieldValues, UseFormRegister, useForm, useWatch } from "react-hook-form";

const linkInputAttribute = { name: "value", label: "Link", placeholder: "e.g. https://www.github.com/johnappleseed", type: INPUT_TYPE.TEXT };

const CardMemo = memo(Card);

const LinkItem = ({ index, link, formValidity, dragProps, removeLinkHandler, formValidityHandler }: ILinkItem) => {
    const defaultValues = { platform: link.platform as string, value: link.value };

    const [linkValidationSchema, setLinkValidationSchema] = useState({ required: "Required" });
    const { register, resetField, control, formState: { errors, isValid, isDirty } } = useForm({ mode: 'onChange', defaultValues });

    const onRemoveItem = useCallback(() => {
        if (!removeLinkHandler) { return; }

        removeLinkHandler(link.id);
    }, [link.id, removeLinkHandler]);

    const formValues = useWatch({ control });
    const isNewLink = link.id.startsWith(UTIL.NEW_LINK_ID);
    const linkFieldErrors = errors.value as FieldError;

    const platforms = useMemo(() => {
        const usedSavedPlatforms = formValidity.map(item => item.link.platform);
        const selectedPlatform = platformsDropdown.find(platform => platform.value === formValues.platform) as IPlatform;
        const unusedPlatforms = platformsDropdown.filter(platform => !usedSavedPlatforms.includes(platform.value));

        return [selectedPlatform, ...unusedPlatforms];
    }, [formValidity, formValues.platform]);

    const LinkFieldChildrenMemo = useMemo(() => <img src={linkSvg} alt="link" />, []);
    const LinkFieldInputFormMemo = useMemo(() => {
        const registerTyped = register as unknown as UseFormRegister<FieldValues>;

        return { register: registerTyped, errors: linkFieldErrors, validationSchema: linkValidationSchema };
    }, [linkFieldErrors, linkValidationSchema, register]);

    const SelectMemo = useMemo(() => <Select name="platform" label="Platform" active={link.platform} options={platforms} control={control as unknown as Control<FieldValues, unknown>} />,
        [control, link.platform, platforms]);

    const InputMemo = useMemo(() => <Input inputAttribute={linkInputAttribute} inputForm={LinkFieldInputFormMemo} children={LinkFieldChildrenMemo} />,
        [LinkFieldChildrenMemo, LinkFieldInputFormMemo]);

    useEffect(() => {
        const patternValidation = {
            pattern: {
                message: "",
                value: new RegExp(`(${formValues.platform as AvailablePlatform}.{1,90})`)
            }
        };

        setLinkValidationSchema(previousState => ({ ...previousState, ...patternValidation }));
    }, [formValues.platform]);

    useEffect(() => {
        if (!Object.hasOwn(linkValidationSchema, "pattern")) { return; }

        resetField("value");
    }, [linkValidationSchema, resetField]);

    useEffect(() => {
        const { platform, value } = formValues;

        formValidityHandler([platform, value] as [AvailablePlatform, string], isValid, isDirty, link.id);
    }, [formValues, isDirty, isValid, link.id, formValidityHandler]);

    const CardChildrenMemo = useMemo(() => {
        return <>
            <div className={styles.header}>
                <p className={styles['header__id']}  {...dragProps}>
                    {!isNewLink && <img src={rectangle} alt="rectangle" className={styles['header__id__img']} />}
                    Link #{index + 1}
                </p>

                <p className={styles['header__remove']} onClick={onRemoveItem}>Remove</p>
            </div>

            <div className={styles.body}>
                {SelectMemo}

                {InputMemo}
            </div>
        </>
    }, [InputMemo, SelectMemo, dragProps, index, isNewLink, onRemoveItem]);

    return <CardMemo children={CardChildrenMemo} />;
}

export default LinkItem;
