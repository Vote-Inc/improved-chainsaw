"use server";

import { cookies } from "next/headers";
import { voteService } from "@/src/vote/services/vote.service";
import { VotePayload, VoteVerification } from "@/src/vote/types/vote.type";

type CastResult =
  | { ok: true; receiptId: string }
  | { ok: false; error: string; status: number };

type VerifyResult =
  | { ok: true; data: VoteVerification }
  | { ok: false; status: 401 | 404 | 500 };

export async function castVoteAction(payload: VotePayload): Promise<CastResult> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, error: "Unauthorised", status: 401 };
  return voteService.castVote(token, payload);
}

export async function verifyVoteAction(receiptId: string): Promise<VerifyResult> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, status: 401 };
  return voteService.verifyVote(token, receiptId);
}
