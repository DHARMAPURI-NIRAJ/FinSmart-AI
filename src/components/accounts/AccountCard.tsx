import { motion } from "framer-motion";
import { 
  Building2, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment" | "loan";
  institution: string;
  balance: number;
  currency: string;
  lastUpdated: string;
  accountNumber: string;
  monthlyChange: number;
  isConnected: boolean;
}

interface AccountCardProps {
  account: Account;
  onSelect: (account: Account) => void;
  isSelected: boolean;
}

const accountTypeConfig = {
  checking: { icon: Building2, color: "text-blue-400", bg: "bg-blue-500/20", gradient: "from-blue-500/20 to-blue-600/10" },
  savings: { icon: PiggyBank, color: "text-emerald-400", bg: "bg-emerald-500/20", gradient: "from-emerald-500/20 to-emerald-600/10" },
  credit: { icon: CreditCard, color: "text-purple-400", bg: "bg-purple-500/20", gradient: "from-purple-500/20 to-purple-600/10" },
  investment: { icon: TrendingUp, color: "text-primary", bg: "bg-primary/20", gradient: "from-primary/20 to-primary/10" },
  loan: { icon: Building2, color: "text-amber-400", bg: "bg-amber-500/20", gradient: "from-amber-500/20 to-amber-600/10" },
};

export function AccountCard({ account, onSelect, isSelected }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const config = accountTypeConfig[account.type];
  const Icon = config.icon;
  const isPositiveChange = account.monthlyChange >= 0;
  const isDebt = account.type === "credit" || account.type === "loan";

  const formatBalance = (balance: number) => {
    if (!showBalance) return "••••••";
    const absBalance = Math.abs(balance);
    return `${isDebt && balance > 0 ? "-" : ""}$${absBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const maskedAccountNumber = `••••${account.accountNumber.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(account)}
      className={cn(
        "glass-card p-5 cursor-pointer relative overflow-hidden transition-all duration-300",
        isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20"
      )}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", config.gradient)} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl", config.bg)}>
              <Icon className={cn("h-5 w-5", config.color)} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{account.name}</h3>
              <p className="text-xs text-muted-foreground">{account.institution}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setShowBalance(!showBalance); }}>
                {showBalance ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showBalance ? "Hide Balance" : "Show Balance"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Bank
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">
            {isDebt ? "Amount Owed" : "Available Balance"}
          </p>
          <p className={cn(
            "text-2xl font-bold",
            isDebt ? "text-red-400" : "text-foreground"
          )}>
            {formatBalance(account.balance)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{maskedAccountNumber}</span>
            {account.isConnected && (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            )}
          </div>
          
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositiveChange ? "text-emerald-400" : "text-red-400"
          )}>
            {isPositiveChange ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{isPositiveChange ? "+" : ""}{account.monthlyChange.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
