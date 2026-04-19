"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/src/identity/actions/auth.actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        data-icon="inline-start"
      >
        <LogOut className="size-4" />
        Log out
      </Button>
    </form>
  );
}
