import * as z from "zod";

export const verifySchema = z.object({
  receiptId: z.string().min(1, "Receipt ID is required"),
});

export type VerifyPayload = z.infer<typeof verifySchema>;
