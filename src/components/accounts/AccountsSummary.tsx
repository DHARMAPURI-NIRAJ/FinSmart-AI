import { motion } from "framer-motion";
import { Wallet, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import type { Account } from "./AccountCard";

interface AccountsSummaryProps {
  accounts: Account[];
}

export function AccountsSummary({ accounts }: AccountsSummaryProps) {
  const totalAssets = accounts
    .filter((a) => a.type !== "credit" && a.type !== "loan")
    .reduce((sum, a) => sum + a.balance, 0);
    
  const totalLiabilities = accounts
    .filter((a) => a.type === "credit" || a.type === "loan")
    .reduce((sum, a) => sum + a.balance, 0);
    
  const netWorth = totalAssets - totalLiabilities;
  
  const savingsBalance = accounts
    .filter((a) => a.type === "savings")
    .reduce((sum, a) => sum + a.balance, 0);
    
  const investmentBalance = accounts
    .filter((a) => a.type === "investment")
    .reduce((sum, a) => sum + a.balance, 0);

  const stats = [
    {
      label: "Net Worth",
      value: `$${netWorth.toLocaleString()}`,
      subValue: `${accounts.length} linked accounts`,
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/20",
    },
    {
      label: "Total Savings",
      value: `$${savingsBalance.toLocaleString()}`,
      subValue: `${accounts.filter(a => a.type === "savings").length} savings accounts`,
      icon: PiggyBank,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
    {
      label: "Investments",
      value: `$${investmentBalance.toLocaleString()}`,
      subValue: "Portfolio value",
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    },
    {
      label: "Total Debt",
      value: `$${totalLiabilities.toLocaleString()}`,
      subValue: `${accounts.filter(a => a.type === "credit" || a.type === "loan").length} credit accounts`,
      icon: CreditCard,
      color: "text-red-400",
      bg: "bg-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.subValue}</p>
        </motion.div>
      ))}
    </div>
  );
}
