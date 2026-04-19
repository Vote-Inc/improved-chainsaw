import * as z from "zod";

export const votePayloadSchema = z.object({
  electionId: z.string(),
  candidateId: z.string(),
});

export const voteReceiptSchema = z.object({
  receiptId: z.string(),
});

export const voteVerificationSchema = z.object({
  electionId: z.string(),
  candidateId: z.string(),
  timestamp: z.string(),
  verified: z.literal(true),
});

export type VotePayload = z.infer<typeof votePayloadSchema>;
export type VoteReceipt = z.infer<typeof voteReceiptSchema>;
export type VoteVerification = z.infer<typeof voteVerificationSchema>;
