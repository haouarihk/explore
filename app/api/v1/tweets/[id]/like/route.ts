import prisma from "@/prisma";
import API from "../../../api";
import { revalidateTag } from "next/cache";

export const POST = API(async ({ handler: { user }, props }) => {

    await prisma.tweet.update({
        where: {
            id: props.params.id,
        },
        data: {
            Likes: {
                disconnect: {
                    id: user?.id
                }
            }
        },
    })

    revalidateTag(`tweet-${props.params.id}-likes`)
})