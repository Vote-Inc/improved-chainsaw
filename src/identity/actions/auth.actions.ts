"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { identityService } from "@/src/identity/services/IdentityService";
import { LoginPayload } from "@/src/identity/schemas/login.schema";

export async function loginAction(
  payload: LoginPayload,
): Promise<{ error: string; status: number } | void> {
  const result = await identityService.login(payload);

  if (!result.ok) {
    return { error: result.error, status: result.status };
  }

  const jar = await cookies();
  jar.set("token", result.data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.set("token", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  redirect("/login");
}
