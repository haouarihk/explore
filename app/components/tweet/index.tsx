import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma";
import { Tweet } from "@prisma/client";
import clsx from "clsx";
import moment from "moment";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Heart, Link, Message, User } from "tabler-icons-react";
import { experimental_useOptimistic as useOptimistic } from "react";
import TweetBody from "./body";



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
    const s = await getServerSession(authOptions);
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
            <div className="flex items-center justify-center avatar rounded-md bg-black w-[42px] h-[42px]">
                {props?.User?.image ?
                    <Image alt={props.User.name + "-Avatar"} src={props.User.image} width={42} height={42} />
                    : <p className="text-2xl">{props.User?.name?.[0] || "G"}</p>}
            </div>

            {/* tweet content */}
            <div className="flex-col">
                {/* username */}
                <div className="flex gap-2">
                    {/* username */}
                    <div className="font-bold tracking-wide">{props?.User?.name || "Guest"}</div>
                    {/* tag */}
                    <div className="font-thin">@{(props.User?.name|| "Guest")?.replaceAll(" ", "")}</div>
                    <div>- {moment(props.createdAt).fromNow()}</div>
                </div>

                {/* content */}
                <p className="text-lg">
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