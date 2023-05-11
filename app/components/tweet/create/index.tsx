import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma";
import { User, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Avatar from "../../avatar";
import TweetBody from "../body";

export default async function CreateTweet(props: { user: User }) {
    const s = await getServerSession(authOptions);
    const submitNewTweet = async (formData: FormData) => {
        "use server";
        if (!s?.user?.email) throw new Error("Not Authorized");
        await prisma.tweet.create({
            data: {
                User: {
                    connect: {
                        email: s?.user?.email
                    }
                },
                content: formData.get("content")?.toString() || ""
            },
        })

        await revalidatePath("/")
    }


    return <form action={submitNewTweet}>
        <TweetBody>
            {/* @ts-ignore */}
            <div className="flex relative">
                <div className="pt-2">
                    <Avatar user={s?.user} />
                </div>
                <textarea name="content" id="content" className='p-4 outline-none w-full bg-transparent text-white resize-none' cols={10} rows={1} />
            </div>
            <div className='flex w-full justify-between'>
                <div>
                    <button></button>
                </div>
                <button className='btn'>Tweet</button>
            </div>
        </TweetBody>
    </form>
}