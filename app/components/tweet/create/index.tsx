'use client';

import { User } from "next-auth";
import Avatar from "../../avatar";
import TweetBody from "../body";
import { Send, TruckLoading } from "tabler-icons-react";
import { useAuth } from "../../auth/client";
import { useState } from "react";
import clsx from "clsx";

export default function CreateTweet(props: { user: User }) {
    const s = useAuth();

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);


    const submit = async () => {
        setLoading(true);
        await fetch("/api/v1/tweets", {
            method: "POST",
            body: JSON.stringify({
                content
            })
        });
        setContent("")
        setLoading(false);
    }

    return <div >
        <TweetBody className="mb-5">
            {/* @ts-ignore */}
            <div className="flex relative">
                <div className="pt-2">
                    <Avatar user={s?.user as any} />
                </div>
                <textarea disabled={loading} value={content} onChange={(e) => setContent(e.target.value)} name="content" id="content" className='p-4 outline-none w-full bg-transparent text-white resize-none' cols={10} rows={1} placeholder="What are you thinking about..." />
            </div>
            <div className='flex w-full justify-between'>
                <div>

                </div>

                {loading ?
                    <TruckLoading />
                    : <button className={clsx('stroke-white/40', {
                        "stroke-white/5": !content.length,
                        "hover:stroke-white": content.length
                    })} onClick={content.length ? submit : undefined}><Send className="stroke-white/40 hover:stroke-white" /></button>}
            </div>
        </TweetBody>
    </div>
}