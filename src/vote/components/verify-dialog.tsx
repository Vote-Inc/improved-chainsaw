"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VerifyForm } from "@/src/vote/forms/form.verify";
import {Button} from "@/components/ui/button";

export function VerifyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
            variant="ghost"
            size="sm"
            data-icon="inline-start">
          <ShieldCheck className="size-4" />
          Verify
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your vote</DialogTitle>
        </DialogHeader>

        <VerifyForm />
      </DialogContent>
    </Dialog>
  );
}
