import { cn } from "@/lib/utils";

interface GradientDividerProps {
  className?: string;
}

export default function GradientDivider({ className }: GradientDividerProps) {
  return (
    <div
      className={cn(
        "h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-indigo-700/40 to-transparent",
        className
      )}
    />
  );
}
