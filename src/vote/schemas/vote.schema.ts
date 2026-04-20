import * as z from "zod";

export const voteSchema = z.object({
  candidateId: z.string().min(1, "Please select a candidate"),
});

export type VoteFormValues = z.infer<typeof voteSchema>;
