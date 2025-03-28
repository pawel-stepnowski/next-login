import { Dispatch, SetStateAction } from "react";

export interface IUserContext
{
    is_authenticated: boolean;
    authenticate(credentials: { username: string, password: string }): Promise<void>;
    logout(): void;
}

export type SessionIdState = [string | null, Dispatch<SetStateAction<string | null>>]