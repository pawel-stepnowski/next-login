import { useRef } from "react";

/**
 * @returns {import("react").RefObject<HTMLDivElement | null>}
 */
export function useRefToHTMLDivElement()
{
    return useRef(null);
}
