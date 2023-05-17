import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getJwtPrivateKey, hashPassword } from "@/libs/auth";
import prisma from "@/prisma";
import { nameSchema, passwordSchema, emailSchema } from "../schema";



export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const name = await nameSchema.parseAsync(body.name, {
            path: ["name"]
        })

        const password = await passwordSchema.parseAsync(body.password, {
            path: ["password"]
        })

        const email = await emailSchema.parseAsync(body.email, {
            path: ["email"]
        })


        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword: await hashPassword(password)
            }
        })

        if (!user) throw new Error("couldn't create user");

        const { hashedPassword, ...UserData } = user;
        // verify password

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
        return NextResponse.json({ success: false, details: err.message || err }, {
            status: 500
        });
    }
}