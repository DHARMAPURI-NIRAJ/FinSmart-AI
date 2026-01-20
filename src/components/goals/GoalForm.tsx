import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Target, TrendingUp, Wallet, Shield, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Goal } from "./GoalCard";

interface GoalFormProps {
  goal?: Goal | null;
  onSubmit: (goal: Omit<Goal, "id" | "createdAt"> & { id?: string }) => void;
  onClose: () => void;
}

const categories = [
  { value: "savings", label: "Savings", icon: Wallet },
  { value: "investment", label: "Investment", icon: TrendingUp },
  { value: "debt", label: "Debt Payoff", icon: Target },
  { value: "emergency", label: "Emergency Fund", icon: Shield },
  { value: "retirement", label: "Retirement", icon: Clock },
  { value: "custom", label: "Custom Goal", icon: Sparkles },
];

export function GoalForm({ goal, onSubmit, onClose }: GoalFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "savings" as Goal["category"],
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    monthlyContribution: "",
    priority: "medium" as Goal["priority"],
    automate: true,
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        category: goal.category,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        deadline: goal.deadline,
        monthlyContribution: goal.monthlyContribution.toString(),
        priority: goal.priority,
        automate: goal.automate,
      });
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...(goal?.id && { id: goal.id }),
      name: formData.name,
      category: formData.category,
      targetAmount: parseFloat(formData.targetAmount) || 0,
      currentAmount: parseFloat(formData.currentAmount) || 0,
      deadline: formData.deadline,
      monthlyContribution: parseFloat(formData.monthlyContribution) || 0,
      priority: formData.priority,
      automate: formData.automate,
    });
  };

  const calculateSuggestedMonthly = () => {
    const target = parseFloat(formData.targetAmount) || 0;
    const current = parseFloat(formData.currentAmount) || 0;
    const deadline = new Date(formData.deadline);
    const today = new Date();
    const months = Math.max(Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)), 1);
    return Math.ceil((target - current) / months);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-xl font-semibold text-foreground">
            {goal ? "Edit Goal" : "Create New Goal"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., House Down Payment"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Goal["category"]) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount ($)</Label>
              <Input
                id="targetAmount"
                type="number"
                min="0"
                step="100"
                placeholder="50000"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount ($)</Label>
              <Input
                id="currentAmount"
                type="number"
                min="0"
                step="100"
                placeholder="5000"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Target Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              {formData.targetAmount && formData.deadline && (
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      monthlyContribution: calculateSuggestedMonthly().toString(),
                    })
                  }
                >
                  Suggest: ${calculateSuggestedMonthly().toLocaleString()}/mo
                </button>
              )}
            </div>
            <Input
              id="monthlyContribution"
              type="number"
              min="0"
              step="50"
              placeholder="500"
              value={formData.monthlyContribution}
              onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Priority Level</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: Goal["priority"]) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div>
              <p className="font-medium text-foreground">AI Automation</p>
              <p className="text-sm text-muted-foreground">
                Let AI automatically allocate funds towards this goal
              </p>
            </div>
            <Switch
              checked={formData.automate}
              onCheckedChange={(checked) => setFormData({ ...formData, automate: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {goal ? "Update Goal" : "Create Goal"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
