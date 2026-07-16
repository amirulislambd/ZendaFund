import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths requiring specific roles
  const isAdminRoute = pathname.startsWith("/dashboard/admin");
  const isCreatorRoute = pathname.startsWith("/dashboard/creator");
  const isSupporterRoute = pathname.startsWith("/dashboard/supporter");

  if (isAdminRoute || isCreatorRoute || isSupporterRoute) {
    try {
      // Fetch session from better-auth endpoint
      const url = new URL("/api/auth/get-session", request.url);
      const sessionResponse = await fetch(url, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!sessionResponse.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const sessionData = await sessionResponse.json();

      if (!sessionData || !sessionData.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const userRole = sessionData.user.role;

      // Role-based authorization
      if (isAdminRoute && userRole !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (isCreatorRoute && userRole !== "creator") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (isSupporterRoute && userRole !== "supporter") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

    } catch (error) {
      console.error("Middleware session error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
