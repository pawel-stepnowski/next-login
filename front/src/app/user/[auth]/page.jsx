'use client'
import { use, useEffect, useState } from "react";
import { FlipContainer } from "../../../components/FlipContainer";
import * as css from "../../../app/styles/styles.classes";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

/**
 * @param {{ params: Promise<{ auth: string }> }} param0 
 */
export default function Page({ params })
{
    const { auth } = use(params);
    const [rotation, setRotation] = useState(auth === 'sign-in' ? 0 : 1);
    const flip = () => { setRotation(value => value + 1); }
    useEffect(() => { window.history.replaceState(null, '', rotation % 2 === 0 ? "/user/sign-in" : "/user/sign-up"); }, [rotation])
    const element = 
    <div className={css.centeredContainer} style={{ perspective: "100vh"  }}>
        <FlipContainer rotation={rotation}>
            <SignIn onFlip={flip} />
            <SignUp onFlip={flip} />
        </FlipContainer>
    </div>
    return element;
}
