import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight, 
  Search,
  Filter,
  Download,
  ShoppingBag,
  Coffee,
  Zap,
  Home,
  Car,
  Briefcase,
  Gift,
  CreditCard
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Account } from "./AccountCard";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface AccountTransactionsProps {
  account: Account;
}

const categoryIcons: Record<string, typeof ShoppingBag> = {
  shopping: ShoppingBag,
  food: Coffee,
  utilities: Zap,
  housing: Home,
  transport: Car,
  salary: Briefcase,
  gift: Gift,
  payment: CreditCard,
};

// Generate mock transactions for the account
const generateTransactions = (accountId: string): Transaction[] => {
  const transactions: Transaction[] = [
    { id: `${accountId}-1`, description: "Monthly Salary", amount: 5200, type: "income", category: "salary", date: "2025-01-18", status: "completed" },
    { id: `${accountId}-2`, description: "Whole Foods Market", amount: -124.50, type: "expense", category: "food", date: "2025-01-17", status: "completed" },
    { id: `${accountId}-3`, description: "Electric Bill", amount: -89.00, type: "expense", category: "utilities", date: "2025-01-16", status: "completed" },
    { id: `${accountId}-4`, description: "Transfer to Savings", amount: -500, type: "transfer", category: "transfer", date: "2025-01-15", status: "completed" },
    { id: `${accountId}-5`, description: "Amazon.com", amount: -67.99, type: "expense", category: "shopping", date: "2025-01-14", status: "completed" },
    { id: `${accountId}-6`, description: "Gas Station", amount: -45.00, type: "expense", category: "transport", date: "2025-01-13", status: "completed" },
    { id: `${accountId}-7`, description: "Freelance Payment", amount: 850, type: "income", category: "salary", date: "2025-01-12", status: "completed" },
    { id: `${accountId}-8`, description: "Netflix Subscription", amount: -15.99, type: "expense", category: "utilities", date: "2025-01-11", status: "completed" },
    { id: `${accountId}-9`, description: "Rent Payment", amount: -1800, type: "expense", category: "housing", date: "2025-01-10", status: "completed" },
    { id: `${accountId}-10`, description: "Birthday Gift Received", amount: 100, type: "income", category: "gift", date: "2025-01-09", status: "completed" },
    { id: `${accountId}-11`, description: "Credit Card Payment", amount: -350, type: "expense", category: "payment", date: "2025-01-08", status: "pending" },
    { id: `${accountId}-12`, description: "Starbucks", amount: -8.50, type: "expense", category: "food", date: "2025-01-07", status: "completed" },
  ];
  return transactions;
};

export function AccountTransactions({ account }: AccountTransactionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const transactions = generateTransactions(account.id);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="text-lg font-semibold text-emerald-400">+${totalIncome.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-muted-foreground">Expenses</p>
            <p className="text-lg font-semibold text-red-400">-${totalExpenses.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
              <SelectItem value="transfer">Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
        {filteredTransactions.map((tx, index) => {
          const CategoryIcon = categoryIcons[tx.category] || CreditCard;
          
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="p-4 hover:bg-card/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  tx.type === "income" ? "bg-emerald-500/20" :
                  tx.type === "transfer" ? "bg-blue-500/20" : "bg-red-500/20"
                )}>
                  {tx.type === "income" ? (
                    <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
                  ) : tx.type === "transfer" ? (
                    <ArrowLeftRight className="h-4 w-4 text-blue-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{tx.description}</p>
                    {tx.status === "pending" && (
                      <Badge variant="outline" className="text-amber-400 border-amber-500/30 bg-amber-500/10">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground capitalize">{tx.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                <p className={cn(
                  "font-semibold",
                  tx.amount >= 0 ? "text-emerald-400" : "text-foreground"
                )}>
                  {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </motion.div>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
