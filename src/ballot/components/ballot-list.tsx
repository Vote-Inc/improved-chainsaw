import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/src/ballot/components/status-badge";
import { ballotService } from "@/src/ballot/services/ballot.service";

export async function BallotList() {
  const ballots = await ballotService.listBallots();

  if (ballots.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center text-muted-foreground">
        No active elections at this time.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {ballots.map((ballot) => (
        <Link key={ballot.electionId} href={`/vote/${ballot.electionId}`}>
          <Card className="cursor-pointer transition-colors hover:border-primary/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg">{ballot.title}</CardTitle>
                <StatusBadge status={ballot.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {ballot.candidates.length} candidate
                {ballot.candidates.length !== 1 ? "s" : ""} · Closes{" "}
                {new Date(ballot.closesAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
