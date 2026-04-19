import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Candidate } from "@/src/ballot/types/candidate.type";

interface ConfirmVoteDialogProps {
  candidate: Candidate | undefined;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function ConfirmVoteDialog({
  candidate,
  isSubmitting,
  onConfirm,
}: ConfirmVoteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full" disabled={!candidate}>
          Submit Vote
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
        </DialogHeader>
        <p className="mt-2 text-sm text-muted-foreground">
          You are about to vote for{" "}
          <strong className="text-foreground">
            {candidate ? candidate.displayName : "—"}
          </strong>
          . This action is final and cannot be undone.
        </p>
        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Confirm Vote"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
