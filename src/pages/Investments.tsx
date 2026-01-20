import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Plus, Settings, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Investment {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  gain: number;
  gainPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    shares: 85,
    currentPrice: 245.80,
    totalValue: 20893,
    gain: 2150,
    gainPercent: 11.48,
    dayChange: 3.20,
    dayChangePercent: 1.32,
  },
  {
    id: "2",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    currentPrice: 178.50,
    totalValue: 4462.50,
    gain: 587.50,
    gainPercent: 15.16,
    dayChange: -1.25,
    dayChangePercent: -0.70,
  },
  {
    id: "3",
    symbol: "VXUS",
    name: "Vanguard Intl Stock ETF",
    shares: 200,
    currentPrice: 62.40,
    totalValue: 12480,
    gain: 830,
    gainPercent: 7.12,
    dayChange: 0.45,
    dayChangePercent: 0.73,
  },
  {
    id: "4",
    symbol: "BND",
    name: "Vanguard Total Bond ETF",
    shares: 120,
    currentPrice: 72.50,
    totalValue: 8700,
    gain: -396,
    gainPercent: -4.35,
    dayChange: 0.15,
    dayChangePercent: 0.21,
  },
  {
    id: "5",
    symbol: "VNQ",
    name: "Vanguard Real Estate ETF",
    shares: 75,
    currentPrice: 95.00,
    totalValue: 7125,
    gain: 525,
    gainPercent: 7.95,
    dayChange: 1.80,
    dayChangePercent: 1.93,
  },
];

export default function Investments() {
  const [investments] = useState<Investment[]>(mockInvestments);

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const totalGain = investments.reduce((sum, inv) => sum + inv.gain, 0);
  const totalGainPercent = (totalGain / (totalPortfolioValue - totalGain)) * 100;
  const dayChange = investments.reduce((sum, inv) => sum + inv.dayChange * inv.shares, 0);

  const handleAddInvestment = () => {
    toast.success("Add Investment", {
      description: "Feature coming soon. Contact support for manual additions.",
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              Investments
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your investment portfolio
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" onClick={handleAddInvestment}>
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${(totalPortfolioValue / 1000).toFixed(1)}K</p>
                <p className="text-xs text-muted-foreground mt-2">Total invested capital</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${totalGain >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${Math.abs(totalGain).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{totalGainPercent.toFixed(2)}% return</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Today Change</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${dayChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${dayChange.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">Daily performance</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{investments.length}</p>
                <p className="text-xs text-muted-foreground mt-2">Assets in portfolio</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>Track individual investments and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-sm">Symbol</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Shares</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Price</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Value</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Gain</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Day Change</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv, idx) => (
                    <motion.tr
                      key={inv.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-primary">{inv.symbol}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{inv.name}</td>
                      <td className="py-3 px-4 text-right text-sm">{inv.shares}</td>
                      <td className="py-3 px-4 text-right text-sm font-medium">${inv.currentPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        ${inv.totalValue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`font-semibold ${inv.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                          ${Math.abs(inv.gain).toFixed(0)}
                        </div>
                        <div className={`text-xs ${inv.gainPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {inv.gainPercent >= 0 ? "+" : ""}{inv.gainPercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {inv.dayChange >= 0 ? (
                            <>
                              <ArrowUpRight className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">
                                {inv.dayChangePercent.toFixed(2)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <ArrowDownLeft className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">
                                {inv.dayChangePercent.toFixed(2)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription>
              Personalized investment recommendations based on your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-background/50 border border-blue-500/20">
                <h4 className="font-semibold text-sm mb-1">Rebalance into Tech ETF</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Your tech allocation is 15% below optimal. Consider adding VGTX for growth exposure.
                </p>
                <Badge className="bg-blue-600/20 text-blue-700 border-blue-600/30">92% confidence</Badge>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-green-500/20">
                <h4 className="font-semibold text-sm mb-1">Increase Bond Allocation</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Current bonds at 15%. Consider increasing to 25% for portfolio stability.
                </p>
                <Badge className="bg-green-600/20 text-green-700 border-green-600/30">88% confidence</Badge>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-emerald-500/20">
                <h4 className="font-semibold text-sm mb-1">Dollar-Cost Averaging Plan</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Automate $500/month investments to reduce timing risk and build wealth systematically.
                </p>
                <Badge className="bg-emerald-600/20 text-emerald-700 border-emerald-600/30">95% confidence</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
