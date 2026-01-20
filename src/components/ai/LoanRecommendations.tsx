import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle2, TrendingDown, AlertTriangle, Zap } from "lucide-react";

interface LoanRecommendationsProps {
  onApprove: (id: string, title: string) => void;
  onReject: (id: string, title: string) => void;
  executedIds: string[];
}

const recommendations = [
  {
    id: "loan-1",
    title: "Refinance Auto Loan",
    description: "Lower your monthly auto loan payment",
    details: "Current rate 5.2%, available rate 3.8%. Save $127/month on 48 remaining payments.",
    amount: "$127/month",
    confidence: 96,
    totalSavings: "$6,096",
    currentRate: "5.2%",
    newRate: "3.8%",
    breakeven: "2 months",
    rationale: "Your credit score improved to 745. Refinancing now takes advantage of lower rates.",
    icon: TrendingDown,
  },
  {
    id: "loan-2",
    title: "Consolidate Credit Card Debt",
    description: "Combine high-interest credit cards",
    details: "Move $8,500 balance from multiple cards (19.2% avg) to personal loan (8.5%).",
    amount: "$186/month",
    confidence: 93,
    totalSavings: "$3,744",
    currentRate: "19.2%",
    newRate: "8.5%",
    breakeven: "1 month",
    rationale: "Credit card consolidation reduces APR significantly and simplifies payments",
    icon: Zap,
  },
  {
    id: "loan-3",
    title: "Home Equity Line of Credit",
    description: "Unlock low-interest borrowing power",
    details: "With $85K equity, qualify for HELOC at 7.2%. Available for emergency or large purchases.",
    amount: "Up to $85K",
    confidence: 88,
    totalSavings: "Lower than credit cards",
    currentRate: "N/A",
    newRate: "7.2%",
    breakeven: "Immediate access",
    rationale: "HELOC provides flexible borrowing at rates much lower than credit cards",
    icon: AlertTriangle,
  },
  {
    id: "loan-4",
    title: "Student Loan Consolidation",
    description: "Simplify multiple student loans",
    details: "Consolidate 4 federal loans into 1. Lock rate at 5.1%, extend terms for lower payments.",
    amount: "$82/month",
    confidence: 91,
    totalSavings: "$2,952",
    currentRate: "5.5% (avg)",
    newRate: "5.1%",
    breakeven: "Immediate",
    rationale: "Lower payment and simpler management. Minimal rate reduction but better cash flow.",
    icon: TrendingDown,
  },
  {
    id: "loan-5",
    title: "Accelerated Loan Payoff",
    description: "Pay off car loan 12 months early",
    details: "Redirect savings ($520/month) to car loan. Save $1,200 in interest.",
    amount: "$520/month",
    confidence: 90,
    totalSavings: "$1,200",
    currentRate: "5.2%",
    newRate: "0% (paid off)",
    breakeven: "12 months",
    rationale: "With emergency fund in place, accelerated payoff improves net worth faster",
    icon: CheckCircle2,
  },
];

export const LoanRecommendations = ({
  onApprove,
  onReject,
  executedIds,
}: LoanRecommendationsProps) => {
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
              className={`border-l-4 border-l-purple-500 transition-all ${
                isExecuted ? "opacity-75 bg-muted/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-purple-500/10 mt-1">
                      <Icon className="w-5 h-5 text-purple-500" />
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
                    <p className="text-2xl font-bold text-purple-600">{rec.amount}</p>
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
                    <p className="text-xs text-muted-foreground mb-1">Total Savings</p>
                    <p className="font-semibold text-green-600">{rec.totalSavings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Rate Change</p>
                    <p className="font-semibold">
                      {rec.currentRate} → {rec.newRate}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Break-Even</p>
                    <p className="font-semibold">{rec.breakeven}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <p className="font-semibold text-blue-600">{rec.confidence}%</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-purple-50/50 dark:bg-purple-500/10">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-1">
                    Why This Recommendation
                  </p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">{rec.rationale}</p>
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
                      className="bg-purple-600 hover:bg-purple-700"
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
