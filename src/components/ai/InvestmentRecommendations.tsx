import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle2, Clock, Zap, Target } from "lucide-react";

interface InvestmentRecommendationsProps {
  onApprove: (id: string, title: string) => void;
  onReject: (id: string, title: string) => void;
  executedIds: string[];
}

const recommendations = [
  {
    id: "inv-1",
    title: "Diversify into Tech ETF",
    description: "Add exposure to high-growth technology sector",
    details: "Your current portfolio lacks tech exposure. Recommend VGTX (Vanguard Growth ETF) - 15% allocation.",
    amount: "$2,500",
    confidence: 92,
    expectedReturn: "+14.2%",
    riskLevel: "Medium",
    timeframe: "12 months",
    rationale: "Analysis shows underweight in tech, strong growth indicators for 2026",
    icon: TrendingUp,
  },
  {
    id: "inv-2",
    title: "Increase Bond Allocation",
    description: "Rebalance to reduce portfolio volatility",
    details: "As you approach mid-career, consider increasing bond allocation to 35% for stability.",
    amount: "$3,000",
    confidence: 88,
    expectedReturn: "+5.8%",
    riskLevel: "Low",
    timeframe: "Ongoing",
    rationale: "Interest rates favor bonds. Current allocation is 25%, ideal is 35%",
    icon: Target,
  },
  {
    id: "inv-3",
    title: "Dollar-Cost Averaging Plan",
    description: "Auto-invest $500 monthly in index funds",
    details: "Implement systematic investment strategy to reduce timing risk and build wealth consistently.",
    amount: "$500/month",
    confidence: 95,
    expectedReturn: "+9.5% (avg)",
    riskLevel: "Low-Medium",
    timeframe: "240 months",
    rationale: "Historical data shows DCA outperforms lump-sum investing by 3-5% over long periods",
    icon: Zap,
  },
  {
    id: "inv-4",
    title: "Real Estate Investment Trust",
    description: "Add REIT exposure for diversification",
    details: "Recommend allocating 5-8% to REITs for real estate exposure without direct property management.",
    amount: "$1,500",
    confidence: 85,
    expectedReturn: "+7.3%",
    riskLevel: "Medium",
    timeframe: "3+ years",
    rationale: "Current portfolio lacks real asset exposure. REITs provide income and growth",
    icon: Target,
  },
];

export const InvestmentRecommendations = ({
  onApprove,
  onReject,
  executedIds,
}: InvestmentRecommendationsProps) => {
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
              className={`border-l-4 border-l-blue-500 transition-all ${
                isExecuted ? "opacity-75 bg-muted/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-blue-500/10 mt-1">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        {isExecuted && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Executed
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{rec.amount}</p>
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
                    <p className="text-xs text-muted-foreground mb-1">Expected Return</p>
                    <p className="font-semibold text-green-600">{rec.expectedReturn}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                    <p className="font-semibold">{rec.riskLevel}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Timeframe</p>
                    <p className="font-semibold">{rec.timeframe}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">AI Rationale</p>
                    <p className="font-semibold text-xs truncate">{rec.rationale}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-blue-50/50 dark:bg-blue-500/10">
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Why This Recommendation
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">{rec.rationale}</p>
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
                      className="bg-blue-600 hover:bg-blue-700"
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
