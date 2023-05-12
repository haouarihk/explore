import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { verifyJwtToken } from "@/libs/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        return NextResponse.json({ user: await verifyJwtToken(body.token) })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ detail: err.message || err });
    }
}