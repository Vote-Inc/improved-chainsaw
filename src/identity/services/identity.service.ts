import { LoginPayload } from "@/src/identity/schemas/login.schema";

type LoginResult =
  | { ok: true; data: { token: string; expiresIn: number } }
  | { ok: false; error: string; status: number };

class IdentityService {
  private get baseUrl() {
    return process.env.API_URL!;
  }

  async login(payload: LoginPayload): Promise<LoginResult> {
    const res = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, error: body?.error ?? "Authentication failed", status: res.status };
    }
    return { ok: true, data: body };
  }

  async logout(token: string): Promise<void> {
    await fetch(`${this.baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).catch(() => null);
  }
}

export const identityService = new IdentityService();
