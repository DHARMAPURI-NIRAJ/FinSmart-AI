import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Filter, SortAsc } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GoalCard, type Goal } from "@/components/goals/GoalCard";
import { GoalForm } from "@/components/goals/GoalForm";
import { GoalsSummary } from "@/components/goals/GoalsSummary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const defaultGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    category: "emergency",
    targetAmount: 15000,
    currentAmount: 8500,
    deadline: "2025-06-30",
    monthlyContribution: 500,
    priority: "high",
    automate: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "House Down Payment",
    category: "savings",
    targetAmount: 60000,
    currentAmount: 22000,
    deadline: "2026-12-31",
    monthlyContribution: 1500,
    priority: "high",
    automate: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Investment Portfolio",
    category: "investment",
    targetAmount: 25000,
    currentAmount: 12500,
    deadline: "2025-12-31",
    monthlyContribution: 800,
    priority: "medium",
    automate: true,
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Car Loan Payoff",
    category: "debt",
    targetAmount: 8000,
    currentAmount: 5200,
    deadline: "2025-03-31",
    monthlyContribution: 400,
    priority: "medium",
    automate: false,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Vacation Fund",
    category: "custom",
    targetAmount: 5000,
    currentAmount: 1800,
    deadline: "2025-08-15",
    monthlyContribution: 300,
    priority: "low",
    automate: false,
    createdAt: "2024-04-01",
  },
];

const STORAGE_KEY = "autonomous-finance-goals";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("priority");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setGoals(JSON.parse(stored));
    } else {
      setGoals(defaultGoals);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGoals));
    }
  }, []);

  const saveGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
  };

  const handleAddGoal = (goalData: Omit<Goal, "id" | "createdAt"> & { id?: string }) => {
    if (goalData.id) {
      // Editing existing goal
      const updatedGoals = goals.map((g) =>
        g.id === goalData.id ? { ...g, ...goalData } : g
      );
      saveGoals(updatedGoals);
      toast.success("Goal updated successfully!");
    } else {
      // Creating new goal
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveGoals([...goals, newGoal]);
      toast.success("Goal created successfully!");
    }
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    saveGoals(updatedGoals);
    toast.success("Goal deleted successfully!");
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const filteredGoals = goals
    .filter((goal) => filterCategory === "all" || goal.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "progress":
          return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount);
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "amount":
          return b.targetAmount - a.targetAmount;
        default:
          return 0;
      }
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Target className="h-7 w-7 text-primary" />
              Financial Goals
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your financial objectives with AI-powered automation
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Summary Cards */}
        <GoalsSummary goals={goals} />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="debt">Debt Payoff</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="amount">Target Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Goals Grid */}
        {filteredGoals.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass-card"
          >
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No goals found</h3>
            <p className="text-muted-foreground mb-6">
              {filterCategory !== "all"
                ? "No goals match your current filter. Try a different category."
                : "Start by creating your first financial goal to track your progress."}
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </motion.div>
        )}
      </div>

      {/* Goal Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <GoalForm
            goal={editingGoal}
            onSubmit={handleAddGoal}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
