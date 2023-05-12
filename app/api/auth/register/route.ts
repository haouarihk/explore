import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getJwtPrivateKey, hashPassword, verifyHashedPassword } from "@/libs/auth";
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();





    const user = await prisma.user.create({
        data: {
            email: body.username,
            name: body.name,
            hashedPassword: await hashPassword(body.password)
        }
    })

    if (user) {
        const {hashedPassword, ...UserData} = user; 
        // verify password

        // make jwt
        const token = await jwt.sign(UserData, getJwtPrivateKey(), {
            algorithm: "RS256",
            expiresIn: "24h"
        })

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );

        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
        });

        return response;
    }

    return NextResponse.json({ success: false });
}