import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

export interface Allocation {
  name: string;
  value: number;
  color: string;
  target: number;
}

interface PortfolioAllocationProps {
  allocations: Allocation[];
  totalValue: number;
}

export function PortfolioAllocation({ allocations, totalValue }: PortfolioAllocationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <PieIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Portfolio Allocation</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {allocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Allocation List */}
        <div className="space-y-3">
          {allocations.map((allocation, index) => {
            const percentage = ((allocation.value / totalValue) * 100);
            const diff = percentage - allocation.target;
            
            return (
              <motion.div
                key={allocation.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: allocation.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground truncate">{allocation.name}</span>
                    <span className="text-sm font-medium text-foreground">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      ${allocation.value.toLocaleString()}
                    </span>
                    <span className={`text-xs ${
                      Math.abs(diff) < 2 ? "text-emerald-400" : 
                      diff > 0 ? "text-amber-400" : "text-red-400"
                    }`}>
                      Target: {allocation.target}% ({diff >= 0 ? "+" : ""}{diff.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
