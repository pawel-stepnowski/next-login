'use client'

export const Key =
{
    /** @type {"signIn"} */
    signIn: "signIn",
    /** @type {"username"} */
    username: "username",
    /** @type {"usernameRequired"} */
    usernameRequired: "usernameRequired",
    /** @type {"password"} */
    password: "password",
    /** @type {"passwordRequired"} */
    passwordRequired: "passwordRequired",
    /** @type {"forgotPassword"} */
    forgotPassword: "forgotPassword",
    /** @type {"authenticationErrorUnknown"} */
    authenticationErrorUnknown: "authenticationErrorUnknown",
    /** @type {"invalidUsernameOrPassword"} */
    invalidUsernameOrPassword: "invalidUsernameOrPassword",
    /** @type {"authTokenIsEmpty"} */
    authTokenIsEmpty: "authTokenIsEmpty",
    /** @type {"firstname"} */
    firstname: "firstname",
    /** @type {"lastname"} */
    lastname: "lastname"
}

/** @type {Record<KeyName, string>} */
export const en =
{
    signIn: "Sign in",
    username: "Username",
    usernameRequired: "Username is required",
    password: "Password",
    passwordRequired: "Password is required",
    forgotPassword: "Forgot your password?",
    welcome: "Welcome again!",
    dontHaveAnAccountYet: "Don't have an account yet? Register and join our community!",
    signUp: "Sign up",
    signOut: "Sign out",
    authenticationErrorUnknown: "An authentication error occurred",
    invalidUsernameOrPassword: "Invalid username or password",
    authTokenIsEmpty: "The token received is empty",
    haveAnAccount: "Already have an account? Log in and return to our community!",
    firstname: "Firstname",
    lastname: "Lastname"
}

/** @type {Record<KeyName, string>} */
const pl =
{
    signIn: "Zaloguj się",
    username: "Nazwa użytkownika",
    usernameRequired: "Nazwa użytkownika jest wymagana",
    password: "Hasło",
    passwordRequired: "Hasło jest wymagane",
    forgotPassword: "Zapomniałeś hasła?",
    welcome: "Witaj ponownie!",
    dontHaveAnAccountYet: "Nie masz jeszcze konta? Zarejestruj się i dołącz do naszej społeczności!",
    haveAnAccount: "Masz już konto? Zaloguj się i wróć do naszej społeczności!",
    signUp: "Zarejestruj się",
    signOut: "Wyloguj się",
    authenticationErrorUnknown: "Wystąpił błąd autentykacji",
    invalidUsernameOrPassword: "Nieprawidłowa nazwa użytkownika lub hasło",
    authTokenIsEmpty: "Otrzymany token jest pusty",
    firstname: "Imię",
    lastname: "Nazwisko"
}

/** @type {Record<string, Record<KeyName, string>>} */
export const translations =
{
    en,
    pl
}