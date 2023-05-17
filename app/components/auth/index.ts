
import { verifyJwtToken } from "@/libs/auth";
import { cookies } from "next/headers";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect, usePathname } from "next/navigation";
import { getUrl } from "../utils/getUrl";



export async function getServerAuth() {
    const cookieList = cookies();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const url = getUrl();
    const { value: token } = cookieList.get("token") ?? { value: null };
    
    if(!token) return { user: null, token };

    try{
        const verifiedUser = await verifyJwtToken(token);
        
        return { user: verifiedUser, token };
    } catch{
        if(!url.pathname.startsWith('/auth'))
            redirect("/auth/login", RedirectType.push);
    }
}