import { BallotList } from "@/src/ballot/components/ballot-list";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Elections</h1>
        <p className="text-sm text-muted-foreground">
          Select an election below to cast your vote.
        </p>
      </div>

      <BallotList />
    </div>
  );
}
