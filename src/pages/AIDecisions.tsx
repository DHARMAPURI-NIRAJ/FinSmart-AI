import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  InvestmentRecommendations,
  LoanRecommendations,
  FinanceManagementAI,
  AIDecisionStats,
} from "@/components/ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, Lightbulb } from "lucide-react";
import { toast } from "sonner";

export const AIDecisions = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [executedDecisions, setExecutedDecisions] = useState<string[]>([]);

  const handleApproveDecision = (id: string, title: string) => {
    setExecutedDecisions([...executedDecisions, id]);
    toast.success(`✓ ${title} approved and executed`);
  };

  const handleRejectDecision = (id: string, title: string) => {
    toast.error(`✗ ${title} rejected`);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">AI Decision Hub</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered recommendations for investments, loans, and financial management
          </p>
        </div>

        {/* Stats Overview */}
        <AIDecisionStats />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Finance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Investment Opportunities
                  </CardTitle>
                  <CardDescription>
                    Based on your portfolio and risk profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Recommended Action</p>
                      <p className="font-semibold">Rebalance into Growth Stocks</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your current allocation is 40% underweight in growth opportunities
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
                      <p className="text-sm text-muted-foreground mb-1">Expected Return</p>
                      <p className="font-semibold text-green-600">+12-15% annually</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on historical performance and market trends
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    Loan Optimization
                  </CardTitle>
                  <CardDescription>
                    Refinancing and debt management suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-purple-500/10">
                      <p className="text-sm text-muted-foreground mb-1">Current Savings Potential</p>
                      <p className="font-semibold text-green-600">$127 per month</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Refinance your auto loan at current rates
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-purple-500/10">
                      <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
                      <p className="font-semibold text-green-600">$1,524</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Over the life of the loan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <InvestmentRecommendations
              onApprove={handleApproveDecision}
              onReject={handleRejectDecision}
              executedIds={executedDecisions}
            />
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans">
            <LoanRecommendations
              onApprove={handleApproveDecision}
              onReject={handleRejectDecision}
              executedIds={executedDecisions}
            />
          </TabsContent>

          {/* Finance Management Tab */}
          <TabsContent value="finance">
            <FinanceManagementAI
              onApprove={handleApproveDecision}
              onReject={handleRejectDecision}
              executedIds={executedDecisions}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default AIDecisions;
