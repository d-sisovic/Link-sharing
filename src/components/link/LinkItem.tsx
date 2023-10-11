import styles from "./LinkItem.module.scss";
import { platformsDropdown } from "../../util";
import Input from "../../ui/components/input/Input";
import { useEffect, useState, useMemo } from "react";
import Select from "../../ui/components/select/Select";
import { ILinkItem } from "./ts/models/link-item.model";
import linkSvg from "../../assets/images/icon-link.svg";
import rectangle from "../../assets/images/rectangle.svg";
import { IPlatform } from "../../ts/models/platform.model";
import { AvailablePlatform } from "../../ts/enums/available-platform.enum";
import { Control, FieldValues, UseFormRegister, useForm, useWatch } from "react-hook-form";

const LinkItem = ({ index, link, formValidity, removeLinkHandler, formValidityHandler }: ILinkItem) => {
    const defaultValues = { platform: link.platform, value: link.value };
    const [linkValidationSchema, setLinkValidationSchema] = useState({ required: "Required" });
    const { register, resetField, control, formState: { errors, isValid, isDirty } } = useForm({ mode: 'onChange', defaultValues });

    const onRemoveItem = () => {
        if (!removeLinkHandler) { return; }

        removeLinkHandler(link.id);
    };

    const formValues = useWatch({ control });

    const platforms = useMemo(() => {
        const usedSavedPlatforms = formValidity.map(item => item.link.platform);
        const selectedPlatform = platformsDropdown.find(platform => platform.value === formValues.platform) as IPlatform;
        const unusedPlatforms = platformsDropdown.filter(platform => !usedSavedPlatforms.includes(platform.value));
        
        return [selectedPlatform, ...unusedPlatforms];
     }, [formValidity, formValues.platform]);

    useEffect(() => {
        const patternValidation = {
            pattern: {
                message: "",
                // eslint-disable-next-line no-useless-escape
                value: new RegExp(`(${formValues.platform as AvailablePlatform}.{1,})`)
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
    }, [formValues, isDirty, isValid, link.id, formValidityHandler])

    return <div className={styles.card}>
        <div className={styles['card__header']}>
            <p className={styles['card__header__id']}>
                {link.id && <img src={rectangle} alt="rectangle" className={styles['card__header__id__img']} />}
                Link #{index + 1}
            </p>

            <p className={styles['card__header__remove']} onClick={onRemoveItem}>Remove</p>
        </div>

        <div className={styles['card__body']}>
            <Select name="platform" label="Platform" active={link.platform} options={platforms} control={control as unknown as Control<FieldValues, unknown>} />

            <Input name="value" type="text" label="Link" placeholder="e.g. https://www.github.com/johnappleseed"
                errors={errors} register={register as unknown as UseFormRegister<FieldValues>}
                validationSchema={linkValidationSchema}>
                <img src={linkSvg} alt="link" />
            </Input>
        </div>
    </div>;
}

export default LinkItem;
