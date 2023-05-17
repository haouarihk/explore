import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getJwtPrivateKey, verifyHashedPassword } from "@/libs/auth";
import prisma from "@/prisma";
import { emailSchema, passwordSchema } from "../schema";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const password = await passwordSchema.parseAsync(body.password, {
            path: ["password"]
        })

        const email = await emailSchema.parseAsync(body.email, {
            path: ["email"]
        })

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // Validate input
        if (!user) throw new Error("Couldn't find the user");

        const { hashedPassword, ...UserData } = user;

        // verify password
        if (!await verifyHashedPassword(password, user.hashedPassword)) throw new Error("Wrong password");

        // make jwt
        const token = await jwt.sign(UserData, getJwtPrivateKey(), {
            algorithm: "RS256",
            expiresIn: "7d"
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
    } catch (err: any) {
        return NextResponse.json({ success: false, detail: err.message || err }, {
            status: 500
        });
    }
}