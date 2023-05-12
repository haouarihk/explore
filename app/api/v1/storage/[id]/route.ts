import prisma from "@/prisma"
import { NextRequest, NextResponse } from "next/server";


// This is a security mesure against XSS attack, incase someone hosts a html page, it will be openly volunerable to take any cookies or localstorage.
const typesAllowedView = ["image", "video"]

export async function GET(req: NextRequest, props: { params?: any; query: { id: string }; }) {
    const data = await prisma.storageItem.findUnique({
        where: {
            id: props.params.id
        },
    });

    return new NextResponse(data?.data, {
        headers: {
            "content-type": data?.mimeType || "",
            ...(typesAllowedView.includes(data?.mimeType.split("/")[0] || "__")
                ? {}
                : { 'Content-Disposition': `attachment; filename=${data?.name}` })
        }
    })
}
