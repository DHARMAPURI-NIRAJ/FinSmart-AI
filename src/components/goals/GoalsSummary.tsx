import { motion } from "framer-motion";
import { Target, TrendingUp, Clock, Sparkles } from "lucide-react";
import type { Goal } from "./GoalCard";

interface GoalsSummaryProps {
  goals: Goal[];
}

export function GoalsSummary({ goals }: GoalsSummaryProps) {
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
  const completedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount).length;
  const automatedGoals = goals.filter((g) => g.automate).length;
  const monthlyRequired = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);

  const stats = [
    {
      label: "Total Progress",
      value: `${totalProgress.toFixed(1)}%`,
      subValue: `$${totalCurrent.toLocaleString()} of $${totalTarget.toLocaleString()}`,
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/20",
    },
    {
      label: "Monthly Required",
      value: `$${monthlyRequired.toLocaleString()}`,
      subValue: "Across all goals",
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
    {
      label: "Goals Completed",
      value: `${completedGoals}/${goals.length}`,
      subValue: `${goals.length - completedGoals} remaining`,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
    },
    {
      label: "AI Automated",
      value: `${automatedGoals}`,
      subValue: `${goals.length > 0 ? Math.round((automatedGoals / goals.length) * 100) : 0}% of goals`,
      icon: Sparkles,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.subValue}</p>
        </motion.div>
      ))}
    </div>
  );
}
