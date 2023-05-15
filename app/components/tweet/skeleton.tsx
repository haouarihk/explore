import { Eye, Heart, User } from "tabler-icons-react";
import { className } from "./body";
import Avatar from "../avatar";
import HeartButton from "./button/heart";

export default function Tweet(props: {}) {
    return <div className={className}>

        {/* tweet */}
        <div className="flex flex-grow min-w-max gap-4 w-full">

            {/* tweet content */}
            <div className="flex flex-col w-full gap-2">
                {/* username */}
                <div className="flex gap-3">
                    <Avatar skeleton />
                    {/* username */}
                    <div>
                        <div className="font-bold tracking-wide">
                            <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        </div>
                        <div className="font-thin text-sm">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div>
                        </div>
                    </div>
                </div>

                {/* content */}
                <p className="text-2xl font-bold tracking-wide">
                    <div className="max-w-sm">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>

                        {!!Math.round(Math.random() * 0.7) && <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                            <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                        </div>}
                    </div>
                </p>
            </div>

            {/* - */}

        </div>

        {/* controls */}
        <div className="flex gap-3 px-3 items-center justify-evenly select-none">
            <form className="flex gap-2 items-center">
                <HeartButton likes={0} likedIt={false} skeleton />
            </form>

            <form className="flex gap-2 items-center">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3"></div>
                <button className="hover:fill-pink-500 hover:stroke-red-500 cursor-pointer">
                    <Eye width={20} />
                </button>
            </form>
        </div>
    </div>
}
