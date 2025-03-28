'use client'
import * as css from "../app/styles/styles.classes";
import { useLanguage } from "./LanguageContext";

export default function LanguageSwitcher()
{
    const { language, setLanguage } = useLanguage();
    const element =
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className={css.languageSwitcher} style={{ zIndex: 50 }}>
        <option value="pl">🇵🇱 Polski</option>
        <option value="en">🇬🇧 English</option>
    </select>
    return element;
}