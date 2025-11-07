"use client";
import { useProfile } from "@/contexts/profile-context";
import React from "react";

const Page = () => {
  const { user } = useProfile();

  return <div>{user?.name}</div>;
};

export default Page;
