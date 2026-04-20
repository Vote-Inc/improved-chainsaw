import * as z from "zod";
import { candidateType } from "@/src/ballot/types/candidate.type";

export const electionStatus = z.enum(["Ongoing", "Final", "Recount"]);

export const electionSummaryType = z.object({
  electionId: z.string(),
  title: z.string(),
  status: electionStatus,
  candidates: z.array(candidateType),
  closesAt: z.string(),
});

export const electionDetailType = z.object({
  electionId: z.string(),
  title: z.string(),
  description: z.string(),
  status: electionStatus,
  candidates: z.array(candidateType),
  opensAt: z.string(),
  closesAt: z.string(),
});

export type ElectionStatus = z.infer<typeof electionStatus>;
export type ElectionSummary = z.infer<typeof electionSummaryType>;
export type ElectionDetail = z.infer<typeof electionDetailType>;
