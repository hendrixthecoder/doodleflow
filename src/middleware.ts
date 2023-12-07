import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./firebase";


export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.getAll()
    console.log(sessionCookie);
    
    
    
    // if (!currentUser) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/login";
    //   const loginUrl = url.href;

    //     return NextResponse.rewrite(url, {
    //         status: 307,
    //         headers: {
    //             Refresh: `0;url=${loginUrl}`,
    //         },
    //     });
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/board"]
}
