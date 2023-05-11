"use client";

import { signIn } from "next-auth/react";

export default function SignInAlert() {
    return <div className='px-4 py-3 flex justify-between items-center border-b-2 border-white/20'>
        <div>Sign In With</div>

        {/* use client */}
        <div className="flex gap-3 items-center">
            <button className="btn" onClick={() => signIn()}>Google</button>
        </div>
    </div>
}