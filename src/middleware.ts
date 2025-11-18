import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const forgotToken = req.cookies.get("reset_email")?.value;
  const otpToken = req.cookies.get("reset_otp")?.value;

  if (!forgotToken && req.nextUrl.pathname.startsWith('/verify-code')) {
    return NextResponse.redirect(new URL("/forgot-password", req.url));
  }

  if (!forgotToken && req.nextUrl.pathname.startsWith('/new-password')) {
    return NextResponse.redirect(new URL("/forgot-password", req.url));
  }

  if (!otpToken && req.nextUrl.pathname.startsWith('/new-password')) {
    return NextResponse.redirect(new URL("/verify-code", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Auth pages to block if user is already logged in
  const authPages = ["/login", "/register", "/forgot-password", "/verify-code", "/new-password"];

  const isAuthPage = authPages.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If logged in and trying to access login/register → redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/new-password",
    "/account/:path*",
  ],
};