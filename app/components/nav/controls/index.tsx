'use client';
import { useState } from "react";
import { X } from "tabler-icons-react";
import Avatar from "../../avatar";
import clsx from "clsx";
import { signIn, signOut } from "../../auth/client";
import { User } from "@prisma/client";

export default function NavControls(props: { defaultSearchValue: string, user?: User }) {
    const [value, setValue] = useState(props.defaultSearchValue);

    const [opened, setOpened] = useState(false);

    return <div className="flex items-center gap-3">
        <div className="flex items-center border-2 rounded-md border-white/20 pr-2 w-full max-w-sm">
            <input type="text" className="p-4 px-5 w-full h-full bg-transparent border-0 outline-0"
                value={value}
                placeholder="Search..."
                onChange={(k) => setValue(k.target.value)} onKeyUp={(e) => e.key == "Enter" && (window.location.href = (`?search=${encodeURIComponent(value)}`))}
            />
            {!!value.length && <X className="hover:fill-primary cursor-pointer" onClick={() => props.defaultSearchValue?.length ? (window.location.href = (`?`)) : setValue("")} />}
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