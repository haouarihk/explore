import prisma from "@/prisma";
import { Tweet } from "@prisma/client";
import clsx from "clsx";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { Eye, Heart, Message, X } from "tabler-icons-react";
import { getServerAuth } from "../auth";
import Avatar from "../avatar";
import { StorageViewer } from "./storage";
import { className } from "./body";
import HeartButton from "./button/heart";
import { nFormatter } from "@/utils";



export default async function Tweet(props: Tweet & {
    Likes: {
        email: string | null;
    }[];
    User: {
        id: string;
        name: string | null;
        image: string | null;
    } | null;
    storage: {
        id: string;
        name: string;
        type: string;
        mimeType: string;
        size: string;
    }[];
    _count: {
        Likes: number;
        storage: number;
    };
}) {
    const s = await getServerAuth();
    const authenticated = !!s?.user;

    const likedIt = !!props.Likes.find(e => e.email == s?.user?.email)

    const submitDelete = async (formData: FormData) => {
        "use server";
        if (!s?.user?.email) throw new Error("Not Authenticated");
        if (s?.user?.id !== props.userId) throw new Error("Not Authorized");
        await prisma.storageItem.deleteMany({
            where: {
                tweetId: props.id,
            },
        })
        await prisma.tweet.delete({
            where: {
                id: props.id,
            },
        })

        await revalidatePath("/")
    }

    return <div className={className}>
        {props.userId == s?.user?.id && <form action={submitDelete} className="absolute right-2 top-2">
            <button>
                <X />
            </button>
        </form>}
        {/* tweet */}
        <div className="flex w-full min-w-max grow gap-4">

            {/* tweet content */}
            <div className="flex w-full flex-col gap-2">
                {/* username */}
                <div className="flex gap-3">
                    <Avatar user={props.User as any} />
                    {/* username */}
                    <div>
                        <div className="font-bold tracking-wide">{props?.User?.name || "Guest"}</div>
                        <div className="text-sm font-thin">{moment(props.createdAt).fromNow()}</div>
                    </div>
                </div>

                {/* content */}
                <p className="text-2xl font-bold tracking-wide">
                    {props.content}
                </p>
            </div>

            {/* - */}

        </div>

        <StorageViewer id={props.id} files={props.storage} />

        {/* controls */}
        <div className="flex select-none items-center justify-evenly gap-3 px-3">
            <div className="flex items-center gap-2">
                <HeartButton likes={props._count.Likes} likedIt={likedIt} tweetId={props.id} />
            </div>

            <form className="flex items-center gap-2">
                {nFormatter(+(props.Views.toString()) || 0)}
                <button className="cursor-pointer hover:fill-pink-500 hover:stroke-red-500">
                    <Eye width={20} />
                </button>
            </form>
        </div>
    </div>
}