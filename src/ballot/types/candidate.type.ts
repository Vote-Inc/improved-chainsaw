import * as z from "zod";

export const candidateType = z.object({
  candidateId: z.uuid(),
  displayName: z.string(),
  party: z.string(),
  imgUrl: z.url(),
});

export type Candidate = z.infer<typeof candidateType>;
