"use client";

import { verifyJwtTokenClient } from "@/libs/auth";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


export function useAuth(props? : { required?: boolean}) {
    // Have also loading state to not show flickering to user
    const [auth, setAuth] = useState<{user: User | null; token: string} | null>(null);

    useEffect(() => {
        (async () => {
            const cookies = new Cookies();
            const token: any = cookies.get("token") ?? null;
            try{
                if(!token) return setAuth(null);

                const verifiedToken = await verifyJwtTokenClient(token);
                if (verifiedToken)
                    setAuth({ user: verifiedToken as any, token });
                else if(props?.required) await signIn();
            } catch(err: any){
                console.log(err, { token });
                await signIn();
            }
        })()
    }, [props?.required]);

    return auth;
}


export async function signIn(props?:{ email: string; password: string; redirectUrl?: string}){
    if(!props) 
        return signOut({
            redirectUrl: "/auth/login"
        })
    
    const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(props)
    })

    const data = await res.json();

    if(!res.ok) throw new Error(data.detail);

    window.location.href = props.redirectUrl || "/";

    return data;
}


export function signOut(props?:{redirectUrl?:string}){
    const cookies = new Cookies();
    cookies.remove("token");
    window.location.href = props?.redirectUrl || "/"
}