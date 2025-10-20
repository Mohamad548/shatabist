import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// List of public paths that don't require authentication
const publicPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/not-found",
  "/error",
];

// List of paths that require authentication
const protectedPaths = [
  "/profile-user",
  "/profile-user/installment",
  "/profile-user/orders",
  "/profile-user/addresses",
  "/profile-user/my-list-products",
  "/profile-user/notifications",
  "/profile-user/comments",
  "/profile-user/support",
  "/profile-user/user-info",
  "/checkout",
  "/cart",
  "/payment",
];

// List of valid paths that exist in the application
const validPaths = [
  "/",
  "/products",
  "/categories",
  "/search",
  "/about",
  "/contact",
  "/blog",
  "/faq",
  "/terms",
  "/privacy",
  // Add more public paths as needed
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // Check if the path is valid
  const isValidPath =
    validPaths.some((path) => pathname.startsWith(path)) ||
    publicPaths.some((path) => pathname.startsWith(path)) ||
    protectedPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static");

  // If path is not valid, redirect to 404
  if (!isValidPath) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  //Redirect logic for authentication
  if (isPublicPath && token) {
    // If user is logged in and tries to access public paths (like login), redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedPath && !token) {
    // If user is not logged in and tries to access protected paths, redirect to login
    // Store the intended destination in the URL
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add custom headers to all responses
  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");

  // You can add more headers or modify the response as needed
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
