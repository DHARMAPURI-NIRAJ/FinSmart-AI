import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Bot, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  category: string;
  date: string;
  isAutomated: boolean;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground">Automated & manual activity</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                transaction.type === "income"
                  ? "bg-success/20 text-success"
                  : transaction.type === "expense"
                  ? "bg-destructive/20 text-destructive"
                  : "bg-primary/20 text-primary"
              )}
            >
              {transaction.type === "income" ? (
                <ArrowDownLeft className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{transaction.description}</p>
                {transaction.isAutomated && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary">
                    <Bot className="w-3 h-3" />
                    Auto
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {transaction.category} • {transaction.date}
              </p>
            </div>

            <div className="text-right">
              <p
                className={cn(
                  "font-display font-semibold text-sm",
                  transaction.type === "income" ? "text-success" : "text-foreground"
                )}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
