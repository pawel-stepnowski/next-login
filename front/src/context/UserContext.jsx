'use client'
import { auth_client } from "../app/layout";
import { overrideMethods } from "../lib/utilities/Object";
import { createContext, useContext, useEffect, useState } from "react";
import { LoggingUser } from "../types/Api";
import { isEmptyOrWhitespace } from "../lib/utilities/String";
import { Key } from "./Language.translations";

export const client = overrideMethods
(
  auth_client, { logIn: false },
  async () =>
  {
    await new Promise(resolve => setTimeout(resolve, 2000));
    throw new Error('Request timeout.');
  }
);

/** @type {import("react").Context<import("./UserContext.types").IUserContext | undefined>} */
// @ts-ignore
const UserContext = createContext(undefined);

/**
 * @param {{ children: React.ReactNode }} param0 
 * @returns 
 */
export default function UserContextProvider({ children })
{
    const [token, setToken] = useState('');
    useEffect(() => { setToken(sessionStorage.getItem("token") ?? ''); }, []);
    /** @type {(session_id: string) => void} */
    const login = (token) =>
    {
        if (isEmptyOrWhitespace(token)) throw new Error(Key.authTokenIsEmpty);
        sessionStorage.setItem("token", token);
        setToken(token);
    };
    const logout = () =>
    {
        sessionStorage.removeItem("token");
        setToken('');
    };
    /** @type {(credentials: { username: string, password: string }) => Promise<void>} */
    const authenticate = async (credentials) =>
    {
      const loggingData =
      {
        googleRecaptchaResponse: '',
        username: credentials.username, 
        password: credentials.password 
      }
        const response = await client.logIn(new LoggingUser(loggingData));
        login(response?.token ?? '');
    };
    const value =
    {
        is_authenticated: typeof token === 'string' && token !== '',
        authenticate,
        logout,
    };
    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>);
};

export function useUserContext()
{
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within an UserContextProvider");
    return context;
};