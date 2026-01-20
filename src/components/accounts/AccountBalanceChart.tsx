import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { Account } from "./AccountCard";

interface AccountBalanceChartProps {
  account: Account;
}

// Generate mock balance history data
const generateBalanceHistory = (currentBalance: number, months: number) => {
  const data = [];
  let balance = currentBalance * 0.7;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  for (let i = months - 1; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const variation = (Math.random() - 0.3) * (currentBalance * 0.1);
    balance = Math.max(0, balance + variation + (currentBalance * 0.3 / months));
    data.push({
      month: monthNames[monthIndex],
      balance: Math.round(balance),
    });
  }
  
  // Ensure last month matches current balance
  data[data.length - 1].balance = currentBalance;
  
  return data;
};

export function AccountBalanceChart({ account }: AccountBalanceChartProps) {
  const [timeRange, setTimeRange] = useState("6");
  const data = generateBalanceHistory(account.balance, parseInt(timeRange));
  
  const minBalance = Math.min(...data.map(d => d.balance));
  const maxBalance = Math.max(...data.map(d => d.balance));
  const startBalance = data[0]?.balance || 0;
  const endBalance = data[data.length - 1]?.balance || 0;
  const totalChange = endBalance - startBalance;
  const percentChange = startBalance > 0 ? ((totalChange / startBalance) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Balance History
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{account.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`text-sm font-medium ${totalChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {totalChange >= 0 ? "+" : ""}{percentChange.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {totalChange >= 0 ? "+" : ""}${Math.abs(totalChange).toLocaleString()}
            </p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={[minBalance * 0.9, maxBalance * 1.1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground">Starting</p>
          <p className="text-sm font-medium text-foreground">${startBalance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Lowest</p>
          <p className="text-sm font-medium text-foreground">${minBalance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Highest</p>
          <p className="text-sm font-medium text-foreground">${maxBalance.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
}
