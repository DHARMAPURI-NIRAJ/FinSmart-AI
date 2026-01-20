import { motion } from "framer-motion";
import { TrendingUp, Wallet, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PortfolioAllocation {
  name: string;
  value: number;
  color: string;
}

interface PortfolioChartProps {
  allocations: PortfolioAllocation[];
  totalValue: number;
  change: number;
}

export const PortfolioChart = ({ allocations, totalValue, change }: PortfolioChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Portfolio Allocation</h3>
            <p className="text-xs text-muted-foreground">AI-optimized distribution</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-bold">{formatCurrency(totalValue)}</p>
          <p className={`text-xs flex items-center gap-1 ${change >= 0 ? "text-success" : "text-destructive"}`}>
            <TrendingUp className="w-3 h-3" />
            {change >= 0 ? "+" : ""}{change}% this month
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {allocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card px-3 py-2 text-xs">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-muted-foreground">{payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <PieChartIcon className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {allocations.map((allocation, index) => (
            <motion.div
              key={allocation.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-3"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: allocation.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{allocation.name}</p>
              </div>
              <p className="text-sm font-medium">{allocation.value}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
