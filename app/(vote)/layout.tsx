import { IdentityNav } from "@/src/identity/components/identity-nav";
import React from "react";

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IdentityNav />
      <main>{children}</main>
    </>
  );
}
