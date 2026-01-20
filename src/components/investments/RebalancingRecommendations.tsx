import { motion } from "framer-motion";
import { Bot, ArrowRight, AlertTriangle, CheckCircle, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Allocation } from "./PortfolioAllocation";

interface RebalancingRecommendationsProps {
  allocations: Allocation[];
  onApplyRecommendation: (id: string) => void;
}

interface Recommendation {
  id: string;
  type: "buy" | "sell" | "hold";
  asset: string;
  action: string;
  amount: number;
  reason: string;
  impact: string;
  priority: "high" | "medium" | "low";
  confidence: number;
}

export function RebalancingRecommendations({ allocations, onApplyRecommendation }: RebalancingRecommendationsProps) {
  // Generate recommendations based on allocation drift
  const recommendations: Recommendation[] = allocations
    .map((alloc) => {
      const currentPercent = (alloc.value / allocations.reduce((sum, a) => sum + a.value, 0)) * 100;
      const drift = currentPercent - alloc.target;
      
      if (Math.abs(drift) < 2) return null;
      
      const isOverweight = drift > 0;
      return {
        id: alloc.name,
        type: isOverweight ? "sell" : "buy" as "buy" | "sell",
        asset: alloc.name,
        action: isOverweight 
          ? `Reduce ${alloc.name} allocation` 
          : `Increase ${alloc.name} allocation`,
        amount: Math.abs(drift) * 100,
        reason: isOverweight
          ? `Currently ${drift.toFixed(1)}% overweight compared to target allocation`
          : `Currently ${Math.abs(drift).toFixed(1)}% underweight compared to target allocation`,
        impact: isOverweight
          ? "Reduces risk exposure and locks in gains"
          : "Improves diversification and growth potential",
        priority: Math.abs(drift) > 5 ? "high" : Math.abs(drift) > 3 ? "medium" : "low",
        confidence: 85 + Math.random() * 10,
      };
    })
    .filter(Boolean) as Recommendation[];

  const priorityColors = {
    high: "text-red-400 bg-red-500/20 border-red-500/30",
    medium: "text-amber-400 bg-amber-500/20 border-amber-500/30",
    low: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
  };

  const typeConfig = {
    buy: { color: "text-emerald-400", bg: "bg-emerald-500/20", icon: TrendingUp },
    sell: { color: "text-red-400", bg: "bg-red-500/20", icon: AlertTriangle },
    hold: { color: "text-blue-400", bg: "bg-blue-500/20", icon: CheckCircle },
  };

  const portfolioHealth = recommendations.filter(r => r.priority === "high").length === 0 
    ? recommendations.filter(r => r.priority === "medium").length === 0
      ? 100
      : 75
    : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Rebalancing Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent suggestions to optimize your portfolio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Portfolio Health</p>
              <p className={cn(
                "text-lg font-bold",
                portfolioHealth >= 80 ? "text-emerald-400" : portfolioHealth >= 60 ? "text-amber-400" : "text-red-400"
              )}>
                {portfolioHealth}%
              </p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="divide-y divide-border/50">
          {recommendations.map((rec, index) => {
            const TypeIcon = typeConfig[rec.type].icon;
            
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={cn("p-2.5 rounded-xl", typeConfig[rec.type].bg)}>
                    <TypeIcon className={cn("h-5 w-5", typeConfig[rec.type].color)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{rec.action}</h4>
                      <Badge variant="outline" className={priorityColors[rec.priority]}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">AI Confidence</span>
                          <span className="text-foreground font-medium">{rec.confidence.toFixed(0)}%</span>
                        </div>
                        <Progress value={rec.confidence} className="h-1.5" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Expected impact:</span>
                      <span className="text-primary">{rec.impact}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onApplyRecommendation(rec.id)}
                    className="shrink-0"
                  >
                    Apply
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center">
          <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Portfolio is Well Balanced</h4>
          <p className="text-muted-foreground">
            Your current allocation closely matches your target. No rebalancing needed.
          </p>
        </div>
      )}

      <div className="p-4 border-t border-border/50 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              AI analyzes your portfolio daily and suggests optimizations
            </span>
          </div>
          <Button variant="link" size="sm" className="text-primary">
            Learn more about AI recommendations
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
