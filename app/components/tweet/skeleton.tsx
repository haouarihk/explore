import { Eye } from "tabler-icons-react";
import { className } from "./body";
import Avatar from "../avatar";
import HeartButton from "./button/heart";
import clsx from "clsx";

export default function Tweet() {
    return <div className={clsx(className, "min-w-max")}>
        {/* tweet */}
        <div className="flex w-full min-w-max grow gap-4">

            {/* tweet content */}
            <div className="flex w-full flex-col gap-2">
                {/* username */}
                <div className="flex w-full gap-3">
                    <Avatar skeleton />
                    {/* username */}
                    <div>
                        <div className="font-bold tracking-wide">
                            <div className="mb-4 h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="text-sm font-thin">
                            <div className="mb-4 h-2.5 w-28 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>

                {/* content */}
                <p className="min-w-max text-2xl font-bold tracking-wide">
                    <div className="max-w-sm">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>

                        {!!Math.round(Math.random() * 0.7) && <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
                            <svg className="h-12 w-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                        </div>}
                    </div>
                </p>
            </div>

            {/* - */}

        </div>

        {/* controls */}
        <div className="flex select-none items-center justify-evenly gap-3 px-3">
            <form className="flex items-center gap-2">
                <HeartButton likes={0} likedIt={false} tweetId="" skeleton />
            </form>

            <form className="flex items-center gap-2">
                <div className="h-4 w-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <button className="cursor-pointer hover:fill-pink-500 hover:stroke-red-500">
                    <Eye width={20} />
                </button>
            </form>
        </div>
    </div>
}
