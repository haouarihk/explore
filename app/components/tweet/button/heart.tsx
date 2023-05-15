"use client";
import clsx from "clsx";
import { Heart } from "tabler-icons-react";

export default function HeartButton(props: { likes?: number, likedIt?: boolean, skeleton?: boolean }) {
    return <>
        {props.skeleton ?
            <div className="max-w-sm h-full">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3"></div>
            </div> :
            (props.likes || 0)}
        <button>
            <Heart width={20} className={clsx("hover:fill-pink-500 hover:stroke-red-500 cursor-pointer", {
                "text-pink-500 fill-pink-500 stroke-red-500": props.likedIt
            })} />
        </button>

    </>
}