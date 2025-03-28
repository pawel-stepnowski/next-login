'use client'
import { Key } from "../../../context/Language.translations";
import { useForm } from "react-hook-form"
import { useLanguage } from "../../../context/LanguageContext";
import * as css from "../../../app/styles/styles.classes";
import clsx from "clsx";
import Input from "../../../components/Input";

/**
 * @param {{ onFlip: () => void }} param0 
 */
export default function SignUp({ onFlip })
{
    const { t } = useLanguage();
    const form = useForm();
    const firstname = { form, label: Key.firstname , register: form.register("firstname", { required: t(Key.usernameRequired) })};
    const lastname = { form, label: Key.lastname , register: form.register("lastname", { required: t(Key.usernameRequired) })};
    const element =
    <div className={css.loginForm}>
        <div className={clsx(css.column, 'text-white bg-secondary')}>
            <h3>{t("welcome")}</h3>
            <p>{t("haveAnAccount")}</p>
            <a onClick={onFlip} className={css.flipButton}>{t("signIn")}</a>
        </div>
        <div className={clsx(css.column, 'column-secondary')}>
            <h2 className={css.columnHeader}>{t('signUp')}</h2>
            <form>
                <Input {...firstname} />
                <Input {...lastname} />
            </form>
            <button className={css.columnButton}>{t('signUp')}</button>
        </div>
    </div>;
    return element;
}