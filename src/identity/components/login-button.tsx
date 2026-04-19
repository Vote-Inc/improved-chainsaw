"use client";

import {LogIn} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginButton() {
  return (
      <Button
          variant="ghost"
          size="sm"
          data-icon="inline-start"
          asChild
      >
        <Link href="/login">
          <LogIn className="size-4" />
          Log in
        </Link>
      </Button>
  );
}
