'use client';
import { useState } from "react";
import { X } from "tabler-icons-react";
import Avatar from "../../avatar";
import clsx from "clsx";
import { signIn, signOut } from "../../auth/client";
import { User } from "@prisma/client";
import { useSearchParams } from "next/navigation";

export default function NavControls(props: { user?: User }) {
    const searchParams = useSearchParams();
    const defaultValue = searchParams.get("search") as string || ""
    const [value, setValue] = useState(defaultValue);

    const [opened, setOpened] = useState(false);

    return <div className="flex items-center gap-3 text-sm md:text-md">
        <div className="flex items-center border-2 rounded-md border-white/20 pr-2 w-full max-w-sm gap-2">
            <div className="flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="text" className="p-4 pl-0 pr-5 w-full h-full bg-transparent border-0 outline-0"
                value={value}
                placeholder="Search..."
                onChange={(k) => setValue(k.target.value)} onKeyUp={(e) => e.key == "Enter" && (window.location.href = (`?search=${encodeURIComponent(value)}`))}
            />
            {!!value.length && <X className="hover:fill-primary cursor-pointer" onClick={() => defaultValue?.length ? (window.location.href = (`?`)) : setValue("")} />}
        </div>

        {props.user ? <div className="relative">
            <button onClick={() => setOpened((e) => !e)} >

                <Avatar user={props.user} className="rounded-full h-[50px] w-[50px] overflow-hidden cursor-pointer" />
            </button>
            {opened && <div className="flex flex-col absolute top-full right-0 w-44 bg-black/20 rounded-md overflow-hidden border-white/60 shadow-md border-2">
                <Item className="hover:bg-inherit">Signed In As <span className="font-bold">{props.user?.name}</span></Item>
                <button className="text-left" onClick={() => signOut()}>
                    <Item>Sign Out</Item>
                </button>
            </div>}
        </div> :
            <button className="btn hover:btn-primary text-left" onClick={() => signIn()}>
                Sign In
            </button>
        }
    </div>
}

function Item(props: { children?: any, className?: any }) {
    return <div className={clsx("text-sm w-full p-3 hover:bg-primary", props.className)}>{props.children}</div>
}