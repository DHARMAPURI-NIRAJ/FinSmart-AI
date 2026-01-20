import { motion } from "framer-motion";
import { Brain, CheckCircle2, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AIDecision {
  id: string;
  type: "savings" | "investment" | "payment" | "alert";
  title: string;
  description: string;
  amount?: string;
  status: "pending" | "executed" | "requires_approval";
  confidence: number;
  timestamp: string;
}

interface AIDecisionCardProps {
  decision: AIDecision;
  delay?: number;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const AIDecisionCard = ({
  decision,
  delay = 0,
  onApprove,
  onReject,
}: AIDecisionCardProps) => {
  const typeStyles = {
    savings: "from-primary/20 to-primary/5 border-primary/30",
    investment: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    payment: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    alert: "from-warning/20 to-warning/5 border-warning/30",
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-muted-foreground" />,
    executed: <CheckCircle2 className="w-4 h-4 text-success" />,
    requires_approval: <AlertTriangle className="w-4 h-4 text-warning" />,
  };

  const statusLabels = {
    pending: "Processing",
    executed: "Executed",
    requires_approval: "Needs Approval",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass-card p-4 border-l-2 transition-all duration-300 hover:scale-[1.01]",
        typeStyles[decision.type]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="ai-badge">
              <Brain className="w-3 h-3" />
              AI Decision
            </span>
            <span className="text-xs text-muted-foreground">{decision.confidence}% confidence</span>
          </div>
          <h4 className="font-semibold text-sm mb-1 truncate">{decision.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{decision.description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {statusIcons[decision.status]}
              <span className="text-xs text-muted-foreground">
                {statusLabels[decision.status]}
              </span>
            </div>
            {decision.amount && (
              <span className="font-display font-semibold text-primary">
                {decision.amount}
              </span>
            )}
          </div>

          {decision.status === "requires_approval" && (
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs h-8"
                onClick={() => onReject?.(decision.id)}
              >
                Reject
              </Button>
              <Button
                size="sm"
                className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
                onClick={() => onApprove?.(decision.id)}
              >
                Approve
              </Button>
            </div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </div>
      <div className="mt-2 text-right">
        <span className="text-xs text-muted-foreground">{decision.timestamp}</span>
      </div>
    </motion.div>
  );
};
