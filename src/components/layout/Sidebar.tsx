import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Target,
  Bot,
  History,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Wallet, label: "Accounts", href: "/accounts" },
  { icon: TrendingUp, label: "Investments", href: "/investments" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Bot, label: "AI Decisions", href: "/ai-decisions" },
  { icon: History, label: "History", href: "/history" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center glow-effect">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">FinSmart AI</h1>
            <p className="text-xs text-muted-foreground">AI-Powered</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* AI Status */}
      <div className="p-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Engine</span>
            <span className="pulse-dot ml-auto" />
          </div>
          <p className="text-xs text-muted-foreground">
            3 active automations running
          </p>
          <p className="text-xs text-primary mt-1">12 decisions today</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-2.5 text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </motion.aside>
  );
};
