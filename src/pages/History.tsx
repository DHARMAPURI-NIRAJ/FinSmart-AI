import { useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, TrendingUp, TrendingDown, Target, ArrowRight, Calendar, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "income" | "expense" | "transfer" | "investment";
  amount: number;
  category: string;
  status: "completed" | "pending";
  icon?: string;
}

interface InvestmentHistory {
  id: string;
  date: string;
  action: "buy" | "sell" | "dividend";
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  portfolioValue?: number;
}

interface GoalHistory {
  id: string;
  date: string;
  goalName: string;
  previousAmount: number;
  currentAmount: number;
  targetAmount: number;
  progress: number;
}

const mockTransactions: Transaction[] = [
  { id: "1", date: "Jan 20, 2025", description: "Salary Deposit", type: "income", amount: 5200, category: "Income", status: "completed" },
  { id: "2", date: "Jan 20, 2025", description: "Auto Savings Transfer", type: "transfer", amount: 520, category: "Savings", status: "completed" },
  { id: "3", date: "Jan 19, 2025", description: "Netflix Subscription", type: "expense", amount: -15.99, category: "Entertainment", status: "completed" },
  { id: "4", date: "Jan 19, 2025", description: "Grocery Store - Whole Foods", type: "expense", amount: -127.50, category: "Food", status: "completed" },
  { id: "5", date: "Jan 18, 2025", description: "Electric Bill Payment", type: "expense", amount: -89.00, category: "Utilities", status: "completed" },
  { id: "6", date: "Jan 18, 2025", description: "Stock Purchase - VTI", type: "investment", amount: -5000, category: "Investment", status: "completed" },
  { id: "7", date: "Jan 17, 2025", description: "Gas Station", type: "expense", amount: -52.35, category: "Transportation", status: "completed" },
  { id: "8", date: "Jan 17, 2025", description: "Restaurant - Dinner", type: "expense", amount: -68.50, category: "Food", status: "completed" },
  { id: "9", date: "Jan 16, 2025", description: "Dividend Payment - AAPL", type: "income", amount: 45.60, category: "Investment Income", status: "completed" },
  { id: "10", date: "Jan 16, 2025", description: "Transfer to Savings", type: "transfer", amount: -1000, category: "Savings", status: "completed" },
];

const mockInvestmentHistory: InvestmentHistory[] = [
  { id: "1", date: "Jan 15, 2025", action: "buy", symbol: "VTI", name: "Vanguard Total Stock Market ETF", quantity: 20, price: 245.80, total: 4916, portfolioValue: 65340 },
  { id: "2", date: "Jan 10, 2025", action: "dividend", symbol: "AAPL", name: "Apple Inc.", quantity: 25, price: 178.50, total: 45.60 },
  { id: "3", date: "Jan 8, 2025", action: "sell", symbol: "BND", name: "Vanguard Total Bond ETF", quantity: 10, price: 72.50, total: 725, portfolioValue: 63100 },
  { id: "4", date: "Jan 5, 2025", action: "buy", symbol: "VXUS", name: "Vanguard Intl Stock ETF", quantity: 50, price: 62.40, total: 3120, portfolioValue: 64200 },
  { id: "5", date: "Dec 28, 2024", action: "dividend", symbol: "VNQ", name: "Vanguard Real Estate ETF", quantity: 75, price: 95.00, total: 28.50 },
  { id: "6", date: "Dec 20, 2024", action: "buy", symbol: "MSFT", name: "Microsoft Corporation", quantity: 5, price: 378.50, total: 1892.50, portfolioValue: 61500 },
];

const mockGoalHistory: GoalHistory[] = [
  { id: "1", date: "Jan 20, 2025", goalName: "Emergency Fund", previousAmount: 8300, currentAmount: 8500, targetAmount: 10000, progress: 85 },
  { id: "2", date: "Jan 15, 2025", goalName: "Vacation Fund", previousAmount: 2000, currentAmount: 2200, targetAmount: 5000, progress: 44 },
  { id: "3", date: "Jan 10, 2025", goalName: "Investment Portfolio", previousAmount: 14500, currentAmount: 15000, targetAmount: 25000, progress: 60 },
  { id: "4", date: "Jan 5, 2025", goalName: "Pay Off Credit Card", previousAmount: 3500, currentAmount: 3200, targetAmount: 4000, progress: 80 },
  { id: "5", date: "Dec 28, 2024", goalName: "Emergency Fund", previousAmount: 8000, currentAmount: 8300, targetAmount: 10000, progress: 83 },
];

export default function History() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTransactions = selectedFilter === "all" 
    ? mockTransactions 
    : mockTransactions.filter(t => t.type === selectedFilter);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <HistoryIcon className="h-8 w-8 text-primary" />
              History
            </h1>
            <p className="text-muted-foreground mt-2">
              View your financial transactions and activity history
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className="whitespace-nowrap"
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "income" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("income")}
                className="whitespace-nowrap"
              >
                Income
              </Button>
              <Button
                variant={selectedFilter === "expense" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("expense")}
                className="whitespace-nowrap"
              >
                Expenses
              </Button>
              <Button
                variant={selectedFilter === "transfer" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("transfer")}
                className="whitespace-nowrap"
              >
                Transfers
              </Button>
              <Button
                variant={selectedFilter === "investment" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("investment")}
                className="whitespace-nowrap"
              >
                Investments
              </Button>
            </div>

            {/* Transaction List */}
            <div className="space-y-2">
              {filteredTransactions.map((txn, idx) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`p-3 rounded-lg ${
                            txn.type === "income" ? "bg-green-500/10" :
                            txn.type === "expense" ? "bg-red-500/10" :
                            txn.type === "transfer" ? "bg-blue-500/10" :
                            "bg-purple-500/10"
                          }`}>
                            {txn.type === "income" ? (
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            ) : txn.type === "expense" ? (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            ) : txn.type === "transfer" ? (
                              <ArrowRight className="w-5 h-5 text-blue-600" />
                            ) : (
                              <TrendingUp className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{txn.description}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{txn.category}</Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {txn.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold text-sm ${
                            txn.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {txn.amount > 0 ? "+" : ""}{txn.amount.toFixed(2)}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {txn.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Activity</CardTitle>
                <CardDescription>Your buy, sell, and dividend history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvestmentHistory.map((inv, idx) => (
                    <motion.div
                      key={inv.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${
                              inv.action === "buy" ? "bg-green-500/10" :
                              inv.action === "sell" ? "bg-red-500/10" :
                              "bg-blue-500/10"
                            }`}>
                              {inv.action === "buy" ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : inv.action === "sell" ? (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                              ) : (
                                <ArrowRight className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">
                                {inv.action.charAt(0).toUpperCase() + inv.action.slice(1)} {inv.symbol}
                              </h4>
                              <p className="text-xs text-muted-foreground">{inv.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm mt-2 ml-11">
                            <span className="text-muted-foreground">
                              {inv.quantity} @ ${inv.price.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{inv.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {inv.action === "sell" ? "-" : ""}${Math.abs(inv.total).toFixed(2)}
                          </p>
                          {inv.portfolioValue && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Portfolio: ${inv.portfolioValue.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress History</CardTitle>
                <CardDescription>Track how your goals are progressing over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGoalHistory.map((goal, idx) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">{goal.goalName}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {goal.date}
                          </p>
                        </div>
                        <Badge className="bg-blue-600/20 text-blue-700 border-blue-600/30">
                          {goal.progress}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="p-2 rounded bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Previous</p>
                          <p className="font-semibold text-sm">${goal.previousAmount.toLocaleString()}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Current</p>
                          <p className="font-semibold text-sm text-green-600">${goal.currentAmount.toLocaleString()}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">Target</p>
                          <p className="font-semibold text-sm">${goal.targetAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
                          className="bg-gradient-to-r from-primary to-blue-600 h-full rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
}
