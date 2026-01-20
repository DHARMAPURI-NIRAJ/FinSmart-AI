import { motion } from "framer-motion";
import { Target, Calendar, TrendingUp, Edit2, Trash2, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Goal {
  id: string;
  name: string;
  category: "savings" | "investment" | "debt" | "emergency" | "retirement" | "custom";
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  monthlyContribution: number;
  priority: "high" | "medium" | "low";
  automate: boolean;
  createdAt: string;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const categoryConfig = {
  savings: { icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  investment: { icon: TrendingUp, color: "text-primary", bg: "bg-primary/20" },
  debt: { icon: Target, color: "text-red-400", bg: "bg-red-500/20" },
  emergency: { icon: Target, color: "text-amber-400", bg: "bg-amber-500/20" },
  retirement: { icon: Target, color: "text-purple-400", bg: "bg-purple-500/20" },
  custom: { icon: Target, color: "text-secondary", bg: "bg-secondary/20" },
};

const priorityConfig = {
  high: { label: "High Priority", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  medium: { label: "Medium Priority", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  low: { label: "Low Priority", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const isCompleted = progress >= 100;
  const CategoryIcon = categoryConfig[goal.category].icon;
  
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const monthsRemaining = Math.max(Math.ceil(daysRemaining / 30), 0);
  
  const remaining = goal.targetAmount - goal.currentAmount;
  const requiredMonthly = monthsRemaining > 0 ? remaining / monthsRemaining : remaining;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "glass-card p-6 relative overflow-hidden group",
        isCompleted && "ring-2 ring-emerald-500/50"
      )}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="h-6 w-6 text-emerald-400" />
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className={cn("p-3 rounded-xl", categoryConfig[goal.category].bg)}>
          <CategoryIcon className={cn("h-6 w-6", categoryConfig[goal.category].color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{goal.name}</h3>
          <p className="text-sm text-muted-foreground capitalize">{goal.category} Goal</p>
        </div>
        <Badge variant="outline" className={priorityConfig[goal.priority].color}>
          {priorityConfig[goal.priority].label}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-foreground font-medium">
              ${goal.currentAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              of ${goal.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <Calendar className="h-3 w-3" />
              <span>Deadline</span>
            </div>
            <p className="font-medium text-foreground">
              {deadline.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </p>
            <p className={cn(
              "text-xs",
              daysRemaining < 30 ? "text-red-400" : daysRemaining < 90 ? "text-amber-400" : "text-muted-foreground"
            )}>
              {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
            </p>
          </div>
          
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
              <TrendingUp className="h-3 w-3" />
              <span>Monthly Target</span>
            </div>
            <p className="font-medium text-foreground">
              ${goal.monthlyContribution.toLocaleString()}
            </p>
            <p className={cn(
              "text-xs",
              requiredMonthly > goal.monthlyContribution ? "text-amber-400" : "text-emerald-400"
            )}>
              {requiredMonthly > goal.monthlyContribution 
                ? `Need $${Math.ceil(requiredMonthly - goal.monthlyContribution)}/mo more`
                : "On track"
              }
            </p>
          </div>
        </div>

        {goal.automate && (
          <div className="flex items-center gap-2 text-xs text-primary">
            <div className="pulse-dot" />
            <span>AI Automation Active</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(goal)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={() => onDelete(goal.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
