import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log("🔥 Middleware running at:", req.nextUrl.pathname);
    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
