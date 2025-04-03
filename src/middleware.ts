import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow webhook endpoint
        if (pathname.startsWith("/api/webhook")) {
          return true;
        }

        // Allow authentication-related routes
        const authRoutes = ["/api/auth", "/sign-in", "/sign-up"];
        if (authRoutes.some((route) => pathname.startsWith(route))) {
          return true;
        }

        // Define public routes
        const publicRoutes = [
          "/",
          "/about",
          "/contact",
          "/search",
          "/cart",
          "/orders",
          "/products",
        ];
        if (
          publicRoutes.some(
            (route) => pathname === route || pathname.startsWith(route)
          ) ||
          pathname.startsWith("/api/products")
        ) {
          return true;
        }

        // Restrict admin routes to admin users only
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        // Require authentication for all other routes
        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
