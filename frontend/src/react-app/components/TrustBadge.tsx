import { LucideIcon } from "lucide-react";
import { cn } from "@/react-app/lib/utils";

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

export default function TrustBadge({ icon: Icon, label, className }: TrustBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100",
        "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
