import prisma from "@/prisma";
import { Tweet } from "@prisma/client";
import clsx from "clsx";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { Heart, Message } from "tabler-icons-react";
import TweetBody from "./body";
import { getServerAuth } from "../auth";
import Avatar from "../avatar";



export default async function Tweet(props: Tweet & {
    Likes: {
        email: string | null;
    }[];
    User: {
        id: string;
        name: string | null;
        image: string | null;
    } | null;
    _count: {
        Comments: number;
        Likes: number;
    };
}) {
    const s = await getServerAuth();
    const authenticated = !!s?.user;

    const likedIt = !!props.Likes.find(e => e.email == s?.user?.email)

    const submitLike = async (formData: FormData) => {
        "use server";
        if (!s?.user?.email) throw new Error("Not Authorized");
        await prisma.tweet.update({
            where: {
                id: props.id,
            },
            data: {
                Likes: {
                    ...(likedIt ? {
                        disconnect: {
                            email: s?.user?.email
                        }
                    } : {
                        connect: {
                            email: s?.user?.email
                        }
                    })
                }
            },
        })

        await revalidatePath("/")
    }

    return <TweetBody>
        {/* tweet */}
        <div className="flex items-center gap-4">
            {/* image */}
            {/* tweet content */}
            <div className="flex flex-col gap-2">
                {/* username */}
                <div className="flex gap-3">
                    <Avatar user={props.User as any} />
                    {/* username */}
                    <div>
                        <div className="font-bold tracking-wide">{props?.User?.name || "Guest"}</div>
                        <div className="font-thin text-sm">{moment(props.createdAt).fromNow()}</div>
                    </div>
                </div>

                {/* content */}
                <p className="text-2xl font-bold tracking-wide">
                    {props.content}
                </p>
            </div>

            {/* - */}
        </div>

        {/* controls */}
        <div className="flex gap-3 px-3 items-center justify-evenly select-none">
            <form action={submitLike} className="flex gap-2 items-center">
                {props._count?.Likes || 0}
                <button className={clsx("hover:fill-pink-500 hover:stroke-red-500 cursor-pointer", {
                    "fill-pink-500 stroke-red-500": likedIt
                })}>
                    <Heart width={20} />
                </button>
            </form>

            <form className="flex gap-2 items-center">
                {props._count?.Comments || 0}
                <button className="hover:fill-pink-500 hover:stroke-red-500 cursor-pointer">
                    <Message width={20} />
                </button>
            </form>
        </div>
    </TweetBody>
}