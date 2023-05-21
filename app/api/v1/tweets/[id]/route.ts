import prisma from "@/prisma";
import API from "../../api";
import { revalidateTag } from "next/cache";

export const DELETE = API(async ({ handler: { user }, props }) => {
    await prisma.tweet.delete({
        where: {
            id: props.params.id,
        },
    })

    revalidateTag(`tweet-${props.params.id}-likes`)
})