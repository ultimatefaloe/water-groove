import { cn } from "@/lib/utils";

interface OverviewItemProps {
  label: string;
  value: string | number;
  positive?: boolean;
}

export function OverviewItem({
  label,
  value,
  positive = false,
}: OverviewItemProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs sm:text-sm text-muted-foreground">
        {label}
      </p>

      <p
        className={cn(
          "text-lg sm:text-2xl font-bold leading-tight",
          positive && "text-green-600"
        )}
      >
        {value}
      </p>
    </div>
  );
}
