"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FieldError, FieldSet, FieldLegend } from "@/components/ui/field";
import { voteSchema, VoteFormValues } from "@/src/vote/schemas/vote.schema";
import { castVoteAction } from "@/src/vote/actions/vote.actions";
import { ElectionDetail } from "@/src/ballot/types/election.type";
import { VoteReceipt } from "@/src/vote/components/vote-receipt";
import { CandidateList } from "@/src/vote/components/candidate-list";
import { ConfirmVoteDialog } from "@/src/vote/components/confirm-vote-dialog";

interface VoteFormProps {
  ballot: ElectionDetail;
}

export function VoteForm({ ballot }: VoteFormProps) {
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const form = useForm<VoteFormValues>({
    resolver: zodResolver(voteSchema),
    defaultValues: { candidateId: "" },
  });

  const candidateId = useWatch({ control: form.control, name: "candidateId" });
  const selectedCandidate = ballot.candidates.find(
    (c) => c.candidateId === candidateId,
  );

  async function onSubmit({ candidateId }: VoteFormValues) {
    const result = await castVoteAction({
      electionId: ballot.electionId,
      candidateId,
    });

    if (!result.ok) {
      if (result.status === 401) {
        toast.error("Not authenticated", {
          description: "Please log in to cast your vote.",
        });
      } else if (result.status === 409) {
        toast.error("Already voted", {
          description: "You have already cast a vote in this election.",
        });
      } else if (result.status === 400) {
        toast.error("Invalid vote", {
          description: "The election or candidate is no longer valid.",
        });
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
        });
      }
      return;
    }

    setReceiptId(result.receiptId);
  }

  if (receiptId) return <VoteReceipt receiptId={receiptId} />;

  return (
    <form id="vote-form" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Controller
          name="candidateId"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend>Select a Candidate</FieldLegend>
              <CandidateList
                name={field.name}
                candidates={ballot.candidates}
                value={field.value}
                onChange={field.onChange}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </FieldSet>
          )}
        />

        <ConfirmVoteDialog
          candidate={selectedCandidate}
          isSubmitting={form.formState.isSubmitting}
          onConfirm={form.handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
