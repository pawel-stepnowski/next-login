import { isEmptyOrWhitespace } from "./String";

/**
 * Converts a caught error object to a text message.
 * 
 * @param {*} error 
 * @returns {string}
 * 
 * @example
 * try {} catch (error) { console.log(getErrorMessage(error)); }
 */
export function getErrorMessage(error)
{
    if (!error) return 'Unknown error.';
    if (error.isApiException === true && isEmptyOrWhitespace(error.response?.error) === false)
        return error.response.error;
    if (Object.hasOwn(error, 'message')) 
        return error.message;
    return error.ToString();
}

/**
 * Calls the provided function {@link func}.
 * If an exception occurs, it passes the error message to {@link setErrorMessage}.
 * The exception is suppressed.
 * Uses {@link getErrorMessage} to generate the error message.
 * 
 * @template {(...args: any[]) => any} T
 * @param {T} func 
 * @param {import("react").Dispatch<import("react").SetStateAction<string>>} setErrorMessage 
 */
export function handleError(func, setErrorMessage)
{
    /** @type {(args: Parameters<T>) => Promise<void>} */
    return async (...args) => 
    {
        try
        {
            await func(...args) 
        }
        catch (error)
        {
            setErrorMessage(getErrorMessage(error));
        }
    };
}

/**
 * Throws an exception from the Response object.
 * 
 * @param {Response} response 
 * @param {KeyName} defaultMessage 
 */
export async function throwErrorResponse(response, defaultMessage)
{
    const contentType = response.headers.get('content-type');
    if (contentType?.startsWith('application/json'))
    {
        const data = await response.json();
        if (data && isEmptyOrWhitespace(data.error) === false) throw new Error(data.error);
    }
    throw new Error(defaultMessage);
}
