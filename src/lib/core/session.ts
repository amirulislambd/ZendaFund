import { headers } from "next/headers";
import { auth } from "../auth";


export const UserSessionToSSR  = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user||null
    return user;
}

