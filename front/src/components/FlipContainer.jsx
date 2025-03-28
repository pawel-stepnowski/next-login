'use client'
import { useEffect } from "react";
import "./FlipContainer.scss"
import { useRefToHTMLDivElement } from "../lib/utilities/React";

/**
 * @param {{ rotation: number , children: [React.ReactNode, React.ReactNode] }} param0 
 * 
 */
export function FlipContainer({ rotation, children })
{
    const front = useRefToHTMLDivElement();
    const back = useRefToHTMLDivElement();
    const updateCssRotation = () =>
    {
        front.current?.style.setProperty('--rotation', `${rotation * 180}deg`);
        back.current?.style.setProperty('--rotation', `${(rotation + 1) * 180}deg`);
    }
    useEffect(updateCssRotation, [rotation]);
    const element =
    <>
        <div ref={front} className="flip-container-front">
            {children[0]}
        </div>
        <div ref={back} className="flip-container-back">
            {children[1]}
        </div>
    </>;
    return element;
}