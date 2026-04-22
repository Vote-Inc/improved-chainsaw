"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { identityService } from "@/src/identity/services/identity.service";
import { LoginPayload } from "@/src/identity/schemas/login.schema";

export async function loginAction(
  payload: LoginPayload,
): Promise<{ error: string; status: number } | void> {
  const result = await identityService.login(payload);

  if (!result.ok) {
    return { error: result.error, status: result.status };
  }

  const jar = await cookies();
  console.log(result);
  jar.set("token", result.data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: result.data.expiresIn,
    secure: false,
  });

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  const token = jar.get("token")?.value;

  if (token) {
    await identityService.logout(token);
  }

  jar.set("token", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  redirect("/login");
}
