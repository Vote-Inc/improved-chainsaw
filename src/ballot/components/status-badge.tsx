import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ElectionStatus } from "@/src/ballot/types/election.type";

const statusConfig: Record<
  ElectionStatus,
  { label: string; className: string; tooltip: string }
> = {
  Ongoing: {
    label: "Ongoing",
    className: "bg-yellow-100 text-yellow-800",
    tooltip: "Election is still in progress.",
  },
  Final: {
    label: "Final Certified",
    className: "bg-green-100 text-green-800",
    tooltip: "Election is completed and officially certified.",
  },
  Recount: {
    label: "Recount in Progress",
    className: "bg-red-100 text-red-800",
    tooltip: "Election results are being recounted.",
  },
};

export function StatusBadge({ status }: { status: ElectionStatus }) {
  const config = statusConfig[status];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge className={config.className}>{config.label}</Badge>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
