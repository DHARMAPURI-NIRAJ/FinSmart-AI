import { motion } from "framer-motion";
import { Bot, Wallet, CreditCard, PiggyBank, TrendingUp, Shield, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AutomationModule {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  lastAction?: string;
}

interface AutomationControlsProps {
  modules: AutomationModule[];
  onToggle: (id: string) => void;
}

export const AutomationControls = ({ modules, onToggle }: AutomationControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Automation Controls</h3>
            <p className="text-xs text-muted-foreground">Manage AI decision modules</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                module.enabled
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-secondary/50 border border-transparent"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  module.enabled ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{module.name}</p>
                  {module.enabled && <span className="pulse-dot" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{module.description}</p>
                {module.lastAction && module.enabled && (
                  <p className="text-xs text-primary mt-1">Last: {module.lastAction}</p>
                )}
              </div>

              <Switch
                checked={module.enabled}
                onCheckedChange={() => onToggle(module.id)}
                className="data-[state=checked]:bg-primary"
              />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">Safety Override</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Transactions above $10,000 require manual approval. All AI decisions are logged and reversible.
        </p>
      </div>
    </motion.div>
  );
};

export const defaultAutomationModules: AutomationModule[] = [
  {
    id: "savings",
    name: "Smart Savings",
    description: "Automatically allocate surplus to savings",
    icon: PiggyBank,
    enabled: true,
    lastAction: "Transferred $250 to savings",
  },
  {
    id: "investments",
    name: "Auto Invest",
    description: "Portfolio rebalancing & optimization",
    icon: TrendingUp,
    enabled: true,
    lastAction: "Rebalanced portfolio",
  },
  {
    id: "bills",
    name: "Bill Pay",
    description: "Automatic bill detection & payment",
    icon: CreditCard,
    enabled: true,
    lastAction: "Paid electricity bill",
  },
  {
    id: "budgets",
    name: "Budget Guard",
    description: "Expense monitoring & alerts",
    icon: Wallet,
    enabled: false,
  },
];
