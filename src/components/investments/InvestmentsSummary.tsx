import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, PieChart } from "lucide-react";

interface InvestmentsSummaryProps {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

export function InvestmentsSummary({
  totalValue,
  totalGain,
  totalGainPercent,
  dayChange,
  dayChangePercent,
}: InvestmentsSummaryProps) {
  const stats = [
    {
      label: "Portfolio Value",
      value: `$${totalValue.toLocaleString()}`,
      change: null,
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/20",
    },
    {
      label: "Total Gain/Loss",
      value: `${totalGain >= 0 ? "+" : ""}$${Math.abs(totalGain).toLocaleString()}`,
      change: totalGainPercent,
      icon: totalGain >= 0 ? TrendingUp : TrendingDown,
      color: totalGain >= 0 ? "text-emerald-400" : "text-red-400",
      bg: totalGain >= 0 ? "bg-emerald-500/20" : "bg-red-500/20",
    },
    {
      label: "Today's Change",
      value: `${dayChange >= 0 ? "+" : ""}$${Math.abs(dayChange).toLocaleString()}`,
      change: dayChangePercent,
      icon: dayChange >= 0 ? TrendingUp : TrendingDown,
      color: dayChange >= 0 ? "text-emerald-400" : "text-red-400",
      bg: dayChange >= 0 ? "bg-emerald-500/20" : "bg-red-500/20",
    },
    {
      label: "Diversification",
      value: "Well Balanced",
      subValue: "8 asset classes",
      icon: PieChart,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
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
          <p className={`text-2xl font-bold ${stat.change !== null ? stat.color : "text-foreground"}`}>
            {stat.value}
          </p>
          {stat.change !== null && (
            <p className={`text-sm mt-1 ${stat.color}`}>
              {stat.change >= 0 ? "+" : ""}{stat.change.toFixed(2)}%
            </p>
          )}
          {stat.subValue && (
            <p className="text-sm text-muted-foreground mt-1">{stat.subValue}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
