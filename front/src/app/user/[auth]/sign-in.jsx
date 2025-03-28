'use client'
import { Key } from "../../../context/Language.translations";
import { useForm } from "react-hook-form"
import { useLanguage } from "../../../context/LanguageContext";
import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { handleError } from "../../../lib/utilities/Errors";
import { useRouter } from "next/navigation";
import * as css from "../../../app/styles/styles.classes";
import Link from "next/link";
import clsx from "clsx";
import Input from "../../../components/Input";
import FormError from "../../../components/FormError";

/**
 * @param {{ onFlip: () => void }} param0 
 */
export default function SignIn({ onFlip })
{
    const { t } = useLanguage();
    const user = useUserContext();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [baseClassName, setBaseClassName] = useState('column-primary');
    const form = useForm();
    const { register, watch, formState: { errors } } = form;
    const username = { form, label: Key.username , register: { type: 'text', ...register("username", { required: t(Key.usernameRequired) }) } };
    const password = { form, label: Key.password, register: { type: 'password', ...register("password", { required: t(Key.passwordRequired) }) } };
    /** @type {(credentials: any) => Promise<void>} */
    const authenticate = async (credentials) => 
    {
        await user.authenticate(credentials);
        setBaseClassName('column-success');
        // // animation.close();
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/');
    }
    /** @type {(e: any) => Promise<void>} */
    const handleSubmit = handleError(form.handleSubmit(authenticate), setErrorMessage);
    const element =
    <div className={css.loginForm}>
        <div className={clsx(css.column, baseClassName)}>
            <h2 className={css.columnHeader}>{t('signIn')}</h2>
            <form onSubmit={handleSubmit}>
                <Input {...username} />
                <Input {...password} />
                <FormError message={errorMessage} onClose={() => setErrorMessage('')} />
                <button className={css.columnButton} type="submit" disabled={form.formState.isSubmitting}>{t('signIn')}</button>
            </form>
            <div className={css.columnLink}><Link href="">{t('forgotPassword')}</Link></div>
        </div>
        <div className={clsx(css.column, `${baseClassName}-dark`)}>
            <h3>{t("welcome")}</h3>
            <p>{t("dontHaveAnAccountYet")}</p>
            <a onClick={onFlip} className="btn btn-light mt-3">{t("signUp")}</a>
        </div>
    </div>;
    return element;
}