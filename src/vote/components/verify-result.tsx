import { ShieldCheck, ShieldX } from "lucide-react";
import { VoteVerification } from "@/src/vote/types/vote.type";

interface VerifyResultProps {
  result: VoteVerification | null;
  notFound: boolean;
}

export function VerifyResult({ result, notFound }: VerifyResultProps) {
  if (notFound) {
    return (
      <div className="border p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div>
            <ShieldX className="size-5 shrink-0 text-destructive" />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <h1 className="text-xl font-semibold">Not found</h1>
          </div>
        </div>
        <div>
          <div>
            <p className="text-xs">
              No vote recorded for this receipt ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="border p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div>
          <ShieldCheck className="size-5 shrink-0 text-green-900" />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <h1 className="text-xl font-semibold ">Vote verified</h1>
        </div>
      </div>
      <div className="space-y-1">
        <div>
          <p className="font-bold">Election</p>
          <code className="break-all font-mono text-xs">
            {result.electionId}
          </code>
        </div>
        <div>
          <p className="font-bold">Candidate</p>
          <code className="break-all font-mono text-xs">
            {result.candidateId}
          </code>
        </div>
        <div>
          <p className="font-bold">Recorded</p>
          <span>
          {new Date(result.timestamp).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
        </div>
      </div>
    </div>
  );
}
