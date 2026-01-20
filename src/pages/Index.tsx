import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AIDecisionCard } from "@/components/dashboard/AIDecisionCard";
import { GoalProgress } from "@/components/dashboard/GoalProgress";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { SavingsChart } from "@/components/dashboard/SavingsChart";
import { AutomationControls, defaultAutomationModules } from "@/components/dashboard/AutomationControls";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Bot,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// Mock Data
const mockGoals = [
  { id: "1", name: "Emergency Fund", current: 8500, target: 10000, deadline: "Dec 2024", category: "emergency" as const },
  { id: "2", name: "Vacation Fund", current: 2200, target: 5000, deadline: "Jun 2025", category: "savings" as const },
  { id: "3", name: "Investment Portfolio", current: 15000, target: 25000, deadline: "Dec 2025", category: "investment" as const },
  { id: "4", name: "Pay Off Credit Card", current: 3200, target: 4000, deadline: "Mar 2025", category: "debt" as const },
];

const mockTransactions = [
  { id: "1", description: "Salary Deposit", amount: 5200, type: "income" as const, category: "Income", date: "Today", isAutomated: false },
  { id: "2", description: "Auto Savings Transfer", amount: 520, type: "transfer" as const, category: "Savings", date: "Today", isAutomated: true },
  { id: "3", description: "Netflix Subscription", amount: 15.99, type: "expense" as const, category: "Entertainment", date: "Yesterday", isAutomated: true },
  { id: "4", description: "Grocery Store", amount: 127.50, type: "expense" as const, category: "Food", date: "Yesterday", isAutomated: false },
  { id: "5", description: "Electric Bill", amount: 89.00, type: "expense" as const, category: "Utilities", date: "2 days ago", isAutomated: true },
];

const mockPortfolioAllocations = [
  { name: "US Stocks", value: 40, color: "hsl(160, 84%, 39%)" },
  { name: "International", value: 20, color: "hsl(200, 80%, 50%)" },
  { name: "Bonds", value: 25, color: "hsl(260, 60%, 55%)" },
  { name: "Real Estate", value: 10, color: "hsl(38, 92%, 50%)" },
  { name: "Cash", value: 5, color: "hsl(217, 33%, 40%)" },
];

const mockSavingsData = [
  { month: "Jul", actual: 2000, projected: 2000 },
  { month: "Aug", actual: 4200, projected: 4000 },
  { month: "Sep", actual: 6100, projected: 6000 },
  { month: "Oct", actual: 8500, projected: 8000 },
  { month: "Nov", actual: 0, projected: 10000 },
  { month: "Dec", actual: 0, projected: 12000 },
];

const mockAIDecisions = [
  {
    id: "1",
    type: "savings" as const,
    title: "Surplus Funds Detected",
    description: "Based on your spending patterns, I've identified $250 that can be safely moved to your emergency fund without affecting your monthly budget.",
    amount: "$250",
    status: "requires_approval" as const,
    confidence: 94,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "investment" as const,
    title: "Portfolio Rebalancing",
    description: "Your US stocks allocation has grown to 45%. Recommending rebalancing to maintain your target 40% allocation.",
    status: "executed" as const,
    confidence: 98,
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "payment" as const,
    title: "Upcoming Bill Payment",
    description: "Scheduled payment for your internet bill of $79.99. Will be processed tomorrow to optimize cash flow.",
    amount: "$79.99",
    status: "pending" as const,
    confidence: 100,
    timestamp: "3 hours ago",
  },
];

const Index = () => {
  const [automationModules, setAutomationModules] = useState(defaultAutomationModules);

  const handleToggleModule = (id: string) => {
    setAutomationModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
    const module = automationModules.find((m) => m.id === id);
    if (module) {
      toast.success(`${module.name} ${module.enabled ? "disabled" : "enabled"}`);
    }
  };

  const handleApproveDecision = (id: string) => {
    toast.success("Decision approved and executed");
  };

  const handleRejectDecision = (id: string) => {
    toast.info("Decision rejected");
  };

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-display text-3xl font-bold">Good morning, DHARMAPURI.</h1>
          <span className="ai-badge">
            <Bot className="w-3 h-3" />
            AI Active
          </span>
        </div>
        <p className="text-muted-foreground">
          Your finances are in great shape. AI has made 12 optimizations today.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Balance"
          value="$47,832.50"
          change={8.2}
          changeLabel="vs last month"
          icon={Wallet}
          variant="primary"
          delay={0}
        />
        <MetricCard
          title="Monthly Savings"
          value="$2,450"
          change={12.5}
          changeLabel="above target"
          icon={PiggyBank}
          variant="success"
          delay={0.1}
        />
        <MetricCard
          title="Investments"
          value="$28,540"
          change={5.8}
          changeLabel="YTD return"
          icon={TrendingUp}
          variant="default"
          delay={0.2}
        />
        <MetricCard
          title="Monthly Spend"
          value="$3,218"
          change={-4.2}
          changeLabel="under budget"
          icon={CreditCard}
          variant="default"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <SavingsChart
            data={mockSavingsData}
            currentSavings={2450}
            monthlyTarget={2000}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PortfolioChart
              allocations={mockPortfolioAllocations}
              totalValue={28540}
              change={5.8}
            />
            <GoalProgress goals={mockGoals} />
          </div>

          <TransactionList transactions={mockTransactions} />
        </div>

        {/* Right Column - AI & Controls */}
        <div className="space-y-6">
          {/* AI Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">AI Decisions</h3>
                <p className="text-xs text-muted-foreground">Recent autonomous actions</p>
              </div>
            </div>

            <div className="space-y-3">
              {mockAIDecisions.map((decision, index) => (
                <AIDecisionCard
                  key={decision.id}
                  decision={decision}
                  delay={0.1 * index}
                  onApprove={handleApproveDecision}
                  onReject={handleRejectDecision}
                />
              ))}
            </div>
          </motion.div>

          <AutomationControls
            modules={automationModules}
            onToggle={handleToggleModule}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
