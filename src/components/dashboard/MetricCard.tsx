import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning";
  delay?: number;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  delay = 0,
}: MetricCardProps) => {
  const isPositive = change !== undefined && change >= 0;

  const variantStyles = {
    default: "from-secondary/50 to-secondary/30",
    primary: "from-primary/20 to-primary/5",
    success: "from-success/20 to-success/5",
    warning: "from-warning/20 to-warning/5",
  };

  const iconStyles = {
    default: "bg-secondary text-foreground",
    primary: "bg-primary/20 text-primary",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card group"
    >
      <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-br opacity-50", variantStyles[variant])} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
            <Icon className="w-5 h-5" />
          </div>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{isPositive ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className="font-display text-2xl font-bold tracking-tight">{value}</p>
        {changeLabel && (
          <p className="text-muted-foreground text-xs mt-2">{changeLabel}</p>
        )}
      </div>
    </motion.div>
  );
};
