import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PerformanceChartProps {
  totalValue: number;
}

const timeRanges = [
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "1Y", label: "1Y" },
  { value: "ALL", label: "All" },
];

// Generate mock performance data
const generatePerformanceData = (range: string) => {
  const data = [];
  let days = 7;
  if (range === "1M") days = 30;
  else if (range === "3M") days = 90;
  else if (range === "1Y") days = 365;
  else if (range === "ALL") days = 730;

  let value = 50000;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.45) * (value * 0.02);
    value = Math.max(value + change, 30000);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value),
      benchmark: Math.round(value * (0.9 + Math.random() * 0.15)),
    });
  }
  
  return data;
};

export function PerformanceChart({ totalValue }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState("3M");
  const [showBenchmark, setShowBenchmark] = useState(true);
  const data = generatePerformanceData(timeRange);
  
  const startValue = data[0]?.value || 0;
  const endValue = data[data.length - 1]?.value || 0;
  const totalChange = endValue - startValue;
  const percentChange = startValue > 0 ? ((totalChange / startValue) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Portfolio Performance
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-foreground">
              ${endValue.toLocaleString()}
            </span>
            <span className={cn(
              "text-sm font-medium px-2 py-0.5 rounded",
              percentChange >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
            )}>
              {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className="px-3"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`,
                name === "value" ? "Portfolio" : "Benchmark"
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
            />
            {showBenchmark && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-muted-foreground">Your Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground rounded border-dashed" />
            <span className="text-muted-foreground">S&P 500 Benchmark</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBenchmark(!showBenchmark)}
        >
          {showBenchmark ? "Hide" : "Show"} Benchmark
        </Button>
      </div>
    </motion.div>
  );
}
