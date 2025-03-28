'use client'
import React, { createContext, useContext, useState } from "react";
import { translations } from "./Language.translations";

/**
 * @param {string} language 
 * @param {KeyName} key 
 */
function translation(language, key)
{
    return (translations[language] || translations['en'])[key] || key;
}

/**
 * @param {string} language 
 * @param {string} key 
 */
function translationUnrestricted(language, key)
{
    // @ts-ignore
    return translation(language, key);
}

const defaultLanguage = 'pl';
/** @type {(key: KeyName) => string} */
const defaultTranslation = key => translation(defaultLanguage, key)
/** @type {(key: string) => string} */
const defaultTranslationUnrestricted = key => translationUnrestricted(defaultLanguage, key)
/** @type {(key: string) => void} */
const setLanguage = () => {}
const LanguageContext = createContext({ language: defaultLanguage, setLanguage, t: defaultTranslation, u: defaultTranslationUnrestricted });

/**
 * @param {{ children: React.ReactNode }} param0 
 * @returns 
 */
export function LanguageProvider({ children })
{
    const [language, setLanguage] = useState("pl");
    /** @type {(key: KeyName) => string} */
    const t = (key) => translation(language, key);
    /** @type {(key: string) => string} */
    const u = (key) => translationUnrestricted(language, key);
    const element = <LanguageContext.Provider value={{ language, setLanguage, t, u }}>{children}</LanguageContext.Provider>
    return element;
};

export const useLanguage = () => useContext(LanguageContext);