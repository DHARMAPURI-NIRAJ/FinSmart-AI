import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface SavingsData {
  month: string;
  actual: number;
  projected: number;
}

interface SavingsChartProps {
  data: SavingsData[];
  currentSavings: number;
  monthlyTarget: number;
}

export const SavingsChart = ({ data, currentSavings, monthlyTarget }: SavingsChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const progressPercentage = Math.min((currentSavings / monthlyTarget) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Savings Growth</h3>
            <p className="text-xs text-muted-foreground">AI-projected trajectory</p>
          </div>
        </div>
        <span className="ai-badge">
          <Sparkles className="w-3 h-3" />
          AI Optimized
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">This Month</p>
          <p className="font-display text-lg font-bold text-primary">{formatCurrency(currentSavings)}</p>
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(progressPercentage)}% of {formatCurrency(monthlyTarget)} target
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">Projected Annual</p>
          <p className="font-display text-lg font-bold">{formatCurrency(monthlyTarget * 12)}</p>
          <p className="text-xs text-success mt-3 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18% from last year
          </p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 33%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 33%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card-elevated px-3 py-2 text-xs">
                      <p className="font-medium mb-1">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.name}: {formatCurrency(entry.value as number)}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="hsl(217, 33%, 40%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#projectedGradient)"
              name="Projected"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fill="url(#actualGradient)"
              name="Actual"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
