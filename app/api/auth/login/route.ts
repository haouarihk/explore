import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getJwtPrivateKey, getJwtPublicKey, verifyHashedPassword } from "@/libs/auth";
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: body.username
            }
        })
        
        // Validate input
        if (user) {
            const { hashedPassword, ...UserData } = user;
            
            // verify password
            if (await verifyHashedPassword(body.password, user.hashedPassword)) {

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
            }
            
            return NextResponse.json({ success: false });
        } catch(err:any){
            return NextResponse.json({ detail: err.message || err });
        }
        }