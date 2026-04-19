import { cookies } from "next/headers";
import Link from "next/link";
import { Vote } from "lucide-react";
import { LogoutButton } from "@/src/identity/components/logout-button";
import { VerifyDialog } from "@/src/vote/components/verify-dialog";
import {LoginButton} from "@/src/identity/components/login-button";

export async function IdentityNav() {
  const jar = await cookies();
  const authenticated = !!jar.get("token")?.value;

  return (
    <header className="py-2">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex p-2 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Vote className="size-4" />
          </div>
          Vote Inc.
        </Link>

        <div className="flex items-center gap-2">
          <VerifyDialog />
          {authenticated ? <LogoutButton /> : <LoginButton/>}
        </div>
      </div>
    </header>
  );
}
