import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  category: "savings" | "investment" | "debt" | "emergency";
}

interface GoalProgressProps {
  goals: Goal[];
}

export const GoalProgress = ({ goals }: GoalProgressProps) => {
  const categoryColors = {
    savings: "bg-primary",
    investment: "bg-blue-500",
    debt: "bg-purple-500",
    emergency: "bg-warning",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Financial Goals</h3>
            <p className="text-xs text-muted-foreground">AI-optimized progress tracking</p>
          </div>
        </div>
        <span className="ai-badge">
          <TrendingUp className="w-3 h-3" />
          On Track
        </span>
      </div>

      <div className="space-y-5">
        {goals.map((goal, index) => {
          const progress = Math.round((goal.current / goal.target) * 100);
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", categoryColors[goal.category])} />
                  <span className="text-sm font-medium">{goal.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{goal.deadline}</span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-2 bg-secondary"
                />
                <div 
                  className={cn(
                    "absolute top-0 left-0 h-2 rounded-full transition-all duration-500",
                    categoryColors[goal.category]
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                </span>
                <span className="text-xs font-medium text-primary">{progress}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
