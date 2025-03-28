'use client'
import { useLanguage } from "../context/LanguageContext";
import { useUserContext } from "../context/UserContext"
import Link from "next/link";
import { useEffect, useState } from "react";
import { user_client } from "./layout";
import * as css from "../app/styles/styles.classes";

export default function Home()
{
  const user = useUserContext();
  const { t } = useLanguage();
  const [profile, setProfile] = useState('');
  const onLoad = async () =>
  {
    if (user.is_authenticated) setProfile(await user_client.getProfile());
  };
  useEffect(() => { onLoad() }, [user]);
  const element =
      <div className={css.pageContainer}>
        {user.is_authenticated
          ? <div className="text-center">
              <h3 className="py-2">{profile}</h3>
              <button className={css.buttonLarge} onClick={() => user.logout()}>{t('signOut')}</button>
            </div>
          : <div><Link href="/user/sign-in" legacyBehavior><button className={css.buttonLarge}>{t('signIn')}</button></Link></div>}
      </div>;
  return element;
}
