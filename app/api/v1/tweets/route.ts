import prisma from "@/prisma";
import API from "../api";
import { revalidatePath } from "next/cache";



export const GET = API(async ({ req, handler: { user } }) => {
    console.log(user)
}, {

})


export const POST = API(async ({ req, handler: { user } }) => {
    const data = await req.json();
    await prisma.tweet.create({
        data: {
            User: {
                connect: {
                    id: user.id
                }
            },
            content: data.content || ""
        },
    })

    await revalidatePath("/");
    return { success: true }
})