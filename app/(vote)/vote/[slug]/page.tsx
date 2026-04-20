import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BallotView } from "@/src/ballot/components/ballot-view";

export default async function VotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All elections
      </Link>

      <BallotView electionId={slug} />
    </div>
  );
}
