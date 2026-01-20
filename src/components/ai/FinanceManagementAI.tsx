import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2, PiggyBank, TrendingUp, Zap, Target } from "lucide-react";

interface FinanceManagementAIProps {
  onApprove: (id: string, title: string) => void;
  onReject: (id: string, title: string) => void;
  executedIds: string[];
}

const recommendations = [
  {
    id: "fin-1",
    title: "Emergency Fund Optimization",
    description: "Build optimal safety net",
    details: "Current: $8,500 (2.2 months). Target: $15,000 (4 months expenses). Auto-transfer $1,500/month.",
    amount: "$1,500/month",
    confidence: 98,
    impact: "Peace of mind",
    timeline: "10 months",
    rationale: "Financial experts recommend 3-6 months emergency fund. You're below optimal range.",
    icon: PiggyBank,
  },
  {
    id: "fin-2",
    title: "Automate Savings & Investments",
    description: "Set up automatic transfers",
    details: "Create automatic transfers: Emergency Fund $500, Investments $1,000, Retirement $750/month.",
    amount: "$2,250/month",
    confidence: 97,
    impact: "+$27K annually",
    timeline: "Immediate",
    rationale: "Automation increases savings discipline by 34% based on behavioral studies",
    icon: Zap,
  },
  {
    id: "fin-3",
    title: "Tax Optimization Strategy",
    description: "Maximize tax-advantaged accounts",
    details: "Increase 401(k) to $15,000 (max), open Roth IRA, harvest tax losses quarterly.",
    amount: "Save $3,200",
    confidence: 92,
    impact: "Tax savings",
    timeline: "Next tax year",
    rationale: "You're eligible for full 401(k) contribution. Tax-loss harvesting saves annually.",
    icon: Target,
  },
  {
    id: "fin-4",
    title: "Spending Pattern Optimization",
    description: "Identify and cut unnecessary expenses",
    details: "Detected: $89/month subscriptions, $156 food waste, $47 duplicate services.",
    amount: "$292/month",
    confidence: 95,
    impact: "$3,504/year",
    timeline: "Immediate",
    rationale: "Your spending has subscription creep. AI detected 8 overlapping services.",
    icon: TrendingUp,
  },
  {
    id: "fin-5",
    title: "Budget Rebalancing",
    description: "Optimize budget allocation",
    details: "Reduce discretionary 8%, redirect to investments. Still allows $180/month for entertainment.",
    amount: "Reallocate $320",
    confidence: 91,
    impact: "Faster goal completion",
    timeline: "Next month",
    rationale: "Analysis shows you can hit goals faster while maintaining lifestyle",
    icon: Lightbulb,
  },
  {
    id: "fin-6",
    title: "Insurance Coverage Review",
    description: "Ensure adequate protection",
    details: "Recommend: increase disability to $4K/month, add umbrella policy ($1M/$20/month).",
    amount: "$50/month",
    confidence: 89,
    impact: "Risk mitigation",
    timeline: "This month",
    rationale: "Current coverage leaves $180K gap. Umbrella policy is cost-effective protection.",
    icon: CheckCircle2,
  },
];

export const FinanceManagementAI = ({
  onApprove,
  onReject,
  executedIds,
}: FinanceManagementAIProps) => {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => {
        const Icon = rec.icon;
        const isExecuted = executedIds.includes(rec.id);

        return (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              className={`border-l-4 border-l-emerald-500 transition-all ${
                isExecuted ? "opacity-75 bg-muted/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-emerald-500/10 mt-1">
                      <Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        {isExecuted && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{rec.amount}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{rec.details}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Impact</p>
                    <p className="font-semibold">{rec.impact}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                    <p className="font-semibold">{rec.timeline}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <p className="font-semibold text-emerald-600">{rec.confidence}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <Badge className="bg-emerald-600/20 text-emerald-700 border-emerald-600/30">
                      High
                    </Badge>
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-emerald-50/50 dark:bg-emerald-500/10">
                  <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                    Why This Recommendation
                  </p>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200">{rec.rationale}</p>
                </div>

                {!isExecuted && (
                  <div className="flex gap-2 justify-end pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReject(rec.id, rec.title)}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onApprove(rec.id, rec.title)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
