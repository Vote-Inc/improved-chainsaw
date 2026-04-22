import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/src/ballot/components/status-badge";
import { VoteForm } from "@/src/vote/forms/form.vote";
import { ballotService } from "@/src/ballot/services/ballot.service";

interface BallotViewProps {
  electionId: string;
}

export async function BallotView({ electionId }: BallotViewProps) {
  const token = (await cookies()).get("token")?.value;
  const ballot = await ballotService.getBallot(electionId, token);

  if (!ballot) notFound();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{ballot.title}</h1>
          <StatusBadge status={ballot.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          Closes{" "}
          {new Date(ballot.closesAt).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>

      {ballot.status === "Ongoing" ? (
        <VoteForm ballot={ballot} />
      ) : (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          This election is no longer accepting votes.
        </div>
      )}
    </div>
  );
}
