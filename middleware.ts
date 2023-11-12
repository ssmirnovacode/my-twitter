import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req?.nextUrl || {};

  const authenticatedApiRoutes = [
    pathname.startsWith("/api/users"),
    pathname.startsWith("/api/posts"),
    pathname.startsWith("/api/follows"),
  ];

  if (authenticatedApiRoutes.includes(true)) {
    const cookie = req?.cookies?.get("jwt");

    if (!cookie || !cookie?.value)
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(cookie.value, secret);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "JWT error" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: "/:path*",
};
