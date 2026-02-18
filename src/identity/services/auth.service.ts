import { ApiError } from "@/src/identity/errors/api.error";
import {
  LoginPayload,
  LoginResponse,
} from "@/src/identity/schemas/login.schema";

export async function loginUser(credentials: LoginPayload) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, payload?.error ?? "Authentication failed");
  }

  return payload as LoginResponse;
}
