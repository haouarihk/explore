"use client";

import { signIn, signUp, useAuth } from "@/app/components/auth/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "tabler-icons-react";


const k = (setVal: Function) => (e: any) => setVal(e.target.value);

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const user = useAuth();

    const router = useRouter();

    const query = useSearchParams();
    const callbackUrl = query.get("callbackUrl") || "/"
    const error = query.get("error")

    async function onSubmit() {
        await toast.promise(signIn({
            email,
            password,
        }), {
            error: (error: any) => <>{error.message || error}</>,
            loading: "loading",
            success: "Submitted"
        })
    }

    if (user) {
        router.push(`?callbackUrl=${callbackUrl}`);
    }

    return (
        <div>
            <div>
                <div>
                    <div>Sign in to your account</div>
                </div>
                <div >
                    <div id="email">
                        <div>Email</div>
                        <input name="email" type="email" value={email} onChange={k(setEmail)} />
                    </div>
                    <div
                        id="password"
                    >
                        <div>Password</div>
                        <div className="flex items-center gap-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password} onChange={k(setPassword)}
                            />
                            <button
                                onClick={() =>
                                    setShowPassword(
                                        (showPassword) => !showPassword,
                                    )
                                }
                            >
                                {showPassword ? (
                                    <Eye />
                                ) : (
                                    <EyeOff />
                                )}
                            </button>
                        </div>

                        {/* When an error occurs */}
                        {error ? (
                            error === "CredentialsSignin" ? (
                                <div>
                                    Invalid credentials
                                </div>
                            ) : <div>
                                Error Code: {error}
                            </div>) : <></>}
                    </div>
                    <button onClick={onSubmit} className="btn">
                        Sign in
                    </button>
                    <div>
                        Not a user yet?{" "}
                        <div className="btn" onClick={() => signUp()}
                        >
                            Register
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}