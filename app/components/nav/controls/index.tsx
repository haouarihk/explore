'use client';
import { useState } from "react";
import { X } from "tabler-icons-react";
import Avatar from "../../avatar";
import clsx from "clsx";
import { signIn, signOut } from "../../auth/client";
import { User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function NavControls(props: { user?: User }) {
    const searchParams = useSearchParams();
    const defaultValue = searchParams.get("search") as string || ""
    const [value, setValue] = useState(defaultValue);

    const [opened, setOpened] = useState(false);

    return <div className="flex items-center gap-3 text-sm md:text-base">
        <div className="flex w-full max-w-sm items-center gap-2 rounded-md border-2 border-white/20 pr-2">
            <div className="pointer-events-none flex items-center pl-3">
                <svg aria-hidden="true" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="text" className="h-full w-full border-0 bg-transparent p-4 pl-0 pr-5 outline-0"
                value={value}
                placeholder="Search..."
                onChange={(k) => setValue(k.target.value)} onKeyUp={(e) => e.key == "Enter" && (window.location.href = (`?search=${encodeURIComponent(value)}`))}
            />
            {!!value.length && <X className="cursor-pointer hover:fill-primary" onClick={() => defaultValue?.length ? (window.location.href = (`?`)) : setValue("")} />}
        </div>

        {props.user ? <div className="relative">
            <button onClick={() => setOpened((e) => !e)} >

                <Avatar user={props.user} className="h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full" />
            </button>
            {opened && <div className="absolute right-0 top-full flex w-44 flex-col overflow-hidden rounded-md border-2 border-white/60 bg-black/20 shadow-md">
                <Item className="hover:bg-inherit">Signed In As <span className="font-bold">{props.user?.name}</span></Item>
                <button className="text-left" onClick={() => signOut()}>
                    <Item>Sign Out</Item>
                </button>
            </div>}
        </div> :
            <Link href="/auth/login" passHref onClick={() => signIn()} className="btn text-left hover:btn-primary">
                Sign In
            </Link>
        }
    </div>
}

function Item(props: { children?: any, className?: any }) {
    return <div className={clsx("w-full p-3 text-sm hover:bg-primary", props.className)}>{props.children}</div>
}