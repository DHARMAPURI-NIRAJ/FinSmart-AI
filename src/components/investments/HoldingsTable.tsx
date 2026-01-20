import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MoreVertical, Star, StarOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "etf" | "bond" | "crypto" | "reit";
  shares: number;
  avgCost: number;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  isFavorite: boolean;
}

interface HoldingsTableProps {
  holdings: Holding[];
  onToggleFavorite: (id: string) => void;
}

const typeColors: Record<string, string> = {
  stock: "bg-blue-500/20 text-blue-400",
  etf: "bg-purple-500/20 text-purple-400",
  bond: "bg-amber-500/20 text-amber-400",
  crypto: "bg-orange-500/20 text-orange-400",
  reit: "bg-emerald-500/20 text-emerald-400",
};

export function HoldingsTable({ holdings, onToggleFavorite }: HoldingsTableProps) {
  const [sortBy, setSortBy] = useState<keyof Holding>("totalValue");
  const [sortAsc, setSortAsc] = useState(false);

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (key: keyof Holding) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Holdings</h3>
        <p className="text-sm text-muted-foreground mt-1">{holdings.length} positions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort("shares")}
              >
                Shares
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort("currentPrice")}
              >
                Price
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort("dayChangePercent")}
              >
                Day Change
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort("totalValue")}
              >
                Value
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort("totalGainPercent")}
              >
                Total Gain
              </th>
              <th className="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding, index) => (
              <motion.tr
                key={holding.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-border/30 hover:bg-card/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleFavorite(holding.id)}
                      className="text-muted-foreground hover:text-amber-400 transition-colors"
                    >
                      {holding.isFavorite ? (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{holding.symbol}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded uppercase", typeColors[holding.type])}>
                          {holding.type}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{holding.name}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-foreground">{holding.shares.toLocaleString()}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-foreground">${holding.currentPrice.toFixed(2)}</span>
                  <p className="text-xs text-muted-foreground">
                    Avg: ${holding.avgCost.toFixed(2)}
                  </p>
                </td>
                <td className="p-4 text-right">
                  <div className={cn(
                    "flex items-center justify-end gap-1",
                    holding.dayChange >= 0 ? "text-emerald-400" : "text-red-400"
                  )}>
                    {holding.dayChange >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span>{holding.dayChangePercent >= 0 ? "+" : ""}{holding.dayChangePercent.toFixed(2)}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {holding.dayChange >= 0 ? "+" : ""}${holding.dayChange.toFixed(2)}
                  </p>
                </td>
                <td className="p-4 text-right">
                  <span className="font-semibold text-foreground">
                    ${holding.totalValue.toLocaleString()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className={cn(
                    "font-medium",
                    holding.totalGain >= 0 ? "text-emerald-400" : "text-red-400"
                  )}>
                    {holding.totalGain >= 0 ? "+" : ""}${Math.abs(holding.totalGain).toLocaleString()}
                  </div>
                  <p className={cn(
                    "text-xs",
                    holding.totalGainPercent >= 0 ? "text-emerald-400" : "text-red-400"
                  )}>
                    {holding.totalGainPercent >= 0 ? "+" : ""}{holding.totalGainPercent.toFixed(2)}%
                  </p>
                </td>
                <td className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Buy More</DropdownMenuItem>
                      <DropdownMenuItem>Sell</DropdownMenuItem>
                      <DropdownMenuItem>Set Alert</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
