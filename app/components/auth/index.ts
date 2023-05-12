
import { verifyJwtToken } from "@/libs/auth";



export async function getServerAuth() {
    const cookies = require("next/headers").cookies;
    const cookieList = cookies();
    const { value: token } = cookieList.get("token") ?? { value: null };
    const verifiedUser = await verifyJwtToken(token);
    return { user: verifiedUser, token };
}