import { VotePayload, VoteVerification } from "@/src/vote/types/vote.type";

type CastResult =
  | { ok: true; receiptId: string }
  | { ok: false; error: string; status: 400 | 409 | 500 };

type VerifyResult =
  | { ok: true; data: VoteVerification }
  | { ok: false; status: 404 | 500 };

class VoteService {
  private get baseUrl() {
    return process.env.API_URL!;
  }

  async castVote(token: string, payload: VotePayload): Promise<CastResult> {
    const res = await fetch(`${this.baseUrl}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => null);
    if (res.status === 409) return { ok: false, error: "Already voted", status: 409 };
    if (res.status === 400) return { ok: false, error: "Invalid request", status: 400 };
    if (!res.ok) return { ok: false, error: "Server error", status: 500 };
    return { ok: true, receiptId: body.receiptId };
  }

  async verifyVote(receiptId: string): Promise<VerifyResult> {
    const res = await fetch(`${this.baseUrl}/votes/verify/${receiptId}`);
    if (res.status === 404) return { ok: false, status: 404 };
    if (!res.ok) return { ok: false, status: 500 };
    return { ok: true, data: await res.json() };
  }
}

export const voteService = new VoteService();
