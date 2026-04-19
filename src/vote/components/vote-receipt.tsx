"use client";

import { useState } from "react";
import { CheckCircle, Copy, Check } from "lucide-react";
import {Button} from "@/components/ui/button";

interface VoteReceiptProps {
  receiptId: string;
}

export function VoteReceipt({ receiptId }: VoteReceiptProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(receiptId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border p-4 space-y-2">
      <div className="flex items-center gap-2">
        <CheckCircle className="size-5 shrink-0 text-primary" />
        <h1 className="text-xl font-semibold">Vote Cast Successfully</h1>
      </div>
      <div className="space-y-1">
        <p className="font-bold">Receipt ID</p>
        <div className="flex items-center gap-2">
          <code className="font-mono text-xs break-all">{receiptId}</code>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy receipt ID"}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Save your receipt ID — use <strong>Verify</strong> in the nav to confirm it was recorded at any time.
        </p>
      </div>
    </div>
  );
}
