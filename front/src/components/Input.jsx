import clsx from "clsx";
import { useLanguage } from "../context/LanguageContext";

export const defaultClassNames =
{
    container: 'mb-3',
    label: 'form-label',
    control: 'form-control',
    validator: 'invalid-feedback'
};

/**
 * @param {import("./types").InputProperties} param0 
 */
export default function Input({ form, label, register, classNames })
{
    const css = classNames ?? defaultClassNames;
    const { t } = useLanguage();
    const error = form.formState.errors[register.name];
    const errorMessage = error && typeof error.message === 'string' ? error.message : '';
    const element =
    <div className={css.container}>
        <label className={css.label}>{t(label)}</label>
        <input {...register} className={clsx(css.control, error && "is-invalid")} disabled={form.formState.isSubmitting} />
        {error && <div className={css.validator}>{errorMessage}</div>}
    </div>;
    return element;
}
