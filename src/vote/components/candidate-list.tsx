import { Candidate } from "@/src/ballot/types/candidate.type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CandidateListProps {
  name: string;
  candidates: Candidate[];
  value: string;
  onChange: (id: string) => void;
  invalid?: boolean;
}

export function CandidateList({ name, candidates, value, onChange, invalid }: CandidateListProps) {
  return (
    <RadioGroup name={name} value={value} onValueChange={onChange}>
      {candidates.map((candidate) => (
        <FieldLabel key={candidate.candidateId} htmlFor={`candidate-${candidate.candidateId}`}>
          <Field orientation="horizontal" data-invalid={invalid}>
            <Avatar size="lg">
              <AvatarImage src={candidate.imgUrl} alt={candidate.displayName} />
              <AvatarFallback>{candidate.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <FieldContent>
              <FieldTitle>{candidate.displayName}</FieldTitle>
              <FieldDescription>{candidate.party}</FieldDescription>
            </FieldContent>
            <RadioGroupItem
              value={candidate.candidateId}
              id={`candidate-${candidate.candidateId}`}
              aria-invalid={invalid}
              className="sr-only"
            />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
