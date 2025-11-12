"use client";

import { usePathname } from "next/navigation";
import SecondaryNavbar from "./secondary-nav/secondary-navbar";

const HiddenRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/new-password",
  "/verify-code",
  "/redirect"
];

export default function ConditionalSecondaryNav() {
  const pathname = usePathname();

  const shouldHide = HiddenRoutes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

  return <SecondaryNavbar />;
}
