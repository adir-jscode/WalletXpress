import { Loader2 } from "lucide-react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "inline";
  text?: string;
  fullscreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function LoadingSpinner({
  size = "md",
  variant = "default",
  text,
  fullscreen = false,
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <Loader2
      className={`${sizeClasses[size]} animate-spin text-primary ${className ?? ""}`}
    />
  );

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2">
        {spinner}
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    );
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {text && (
            <p className="text-sm text-muted-foreground text-center">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {spinner}
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
