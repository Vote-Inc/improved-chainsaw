"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { verifySchema, VerifyPayload } from "@/src/vote/schemas/verify.schema";
import { verifyVoteAction } from "@/src/vote/actions/vote.actions";
import { VoteVerification } from "@/src/vote/types/vote.type";
import { VerifyResult } from "@/src/vote/components/verify-result";

export function VerifyForm() {
  const [result, setResult] = useState<VoteVerification | null>(null);
  const [notFound, setNotFound] = useState(false);

  const form = useForm<VerifyPayload>({
    resolver: zodResolver(verifySchema),
    defaultValues: { receiptId: "" },
  });

  async function onSubmit({ receiptId }: VerifyPayload) {
    setResult(null);
    setNotFound(false);

    const res = await verifyVoteAction(receiptId);

    if (!res.ok) {
      setNotFound(true);
    } else {
      setResult(res.data);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex-1">
          <Controller
            name="receiptId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="receiptId">Receipt ID</FieldLabel>
                <Input
                  {...field}
                  id="receiptId"
                  className="font-mono text-sm"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    field.onChange(e);
                    setResult(null);
                    setNotFound(false);
                  }}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      <div className="flex flex-col justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Spinner /> : "Check"}
          </Button>
      </div>
      </form>

      <VerifyResult result={result} notFound={notFound} />
    </div>
  );
}
