import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export const AIDecisionStats = () => {
  const stats = [
    {
      title: "AI Recommendations",
      value: "12",
      change: "+3 new",
      icon: TrendingUp,
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Executed Decisions",
      value: "8",
      change: "+2 this week",
      icon: CheckCircle2,
      color: "from-green-500/20 to-green-500/5",
      borderColor: "border-green-500/30",
    },
    {
      title: "Potential Savings",
      value: "$4,250",
      change: "Annual benefit",
      icon: ArrowUpRight,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30",
    },
    {
      title: "Accuracy Rate",
      value: "94.2%",
      change: "Based on 47 decisions",
      icon: AlertCircle,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              className={`border ${stat.borderColor} bg-gradient-to-br ${stat.color} hover:shadow-lg transition-all`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background/50">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
