import { NextRequest, NextResponse } from "next/server";
import { useProfile } from "./contexts/profile-context";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();
  // Forgot password middleware
  if (
    pathname.startsWith("/verify-code") ||
    pathname.startsWith("/new-password")
  ) {
    const email = req.cookies.get("reset_email")?.value;
    const otp = req.cookies.get("reset_otp")?.value;
    res.cookies.delete("token");
    res.cookies.delete("user");

    if (!email) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/new-password") && !otp) {
      const url = req.nextUrl.clone();
      url.pathname = "/verify-code";
      return NextResponse.redirect(url);
    }
    return res;
  }
  // auth management middleware

  
  console.log("Middleware triggered for URL:", pathname);
  return NextResponse.next();
}
