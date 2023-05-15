"use client";
import { nFormatter } from "@/utils";
import clsx from "clsx";
import { useState } from "react";
import { Heart } from "tabler-icons-react";

export default function HeartButton(props: { likes?: number, tweetId: string, likedIt?: boolean, skeleton?: boolean }) {
    const [liked, setLiked] = useState(props.likedIt)


    const submit = async () => {
        const re = !liked;
        setLiked(re);
        await fetch(`/api/v1/tweets/${props.tweetId}/${re ? "like" : "dislike"}`, {
            method: "POST",
            body: JSON.stringify({

            })
        }).catch(() => setLiked(!re))
    }

    return <>
        {props.skeleton ?
            <div className="max-w-sm h-full">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3"></div>
            </div> :
            ((nFormatter(+((!props.likedIt && liked ? (props.likes || 0) + 1 : props.likes) || 0))) || 0)}
        <button onClick={submit}>
            <Heart width={20} className={clsx("hover:fill-pink-500 hover:stroke-red-500 cursor-pointer", {
                "text-pink-500 fill-pink-500 stroke-red-500": liked
            })} />
        </button>
    </>
}