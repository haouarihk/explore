"use client";
import clsx from "clsx";
import { Heart } from "tabler-icons-react";

export default function HeartButton(props: { likes?: number, likedIt?: boolean }) {
    return <>
        {props.likes || 0}
        <button className={clsx("hover:fill-pink-500 hover:stroke-red-500 cursor-pointer", {
            "fill-pink-500 stroke-red-500": props.likedIt
        })}>
            <Heart width={20} />
        </button>

    </>
}