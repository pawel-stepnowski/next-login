/**
 * @param {*} value 
 */
export function isEmptyOrWhitespace(value)
{
    return typeof value !== 'string' || value.match(/^\s*$/) !== null;
}