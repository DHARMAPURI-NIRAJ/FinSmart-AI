import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Plus, Link2, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AccountCard, type Account } from "@/components/accounts/AccountCard";
import { AccountsSummary } from "@/components/accounts/AccountsSummary";
import { AccountBalanceChart } from "@/components/accounts/AccountBalanceChart";
import { AccountTransactions } from "@/components/accounts/AccountTransactions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Primary Checking",
    type: "checking",
    institution: "Chase Bank",
    balance: 12450.00,
    currency: "USD",
    lastUpdated: "2025-01-20T10:30:00",
    accountNumber: "****4521",
    monthlyChange: 3.2,
    isConnected: true,
  },
  {
    id: "2",
    name: "High-Yield Savings",
    type: "savings",
    institution: "Marcus by Goldman Sachs",
    balance: 28750.00,
    currency: "USD",
    lastUpdated: "2025-01-20T10:30:00",
    accountNumber: "****8834",
    monthlyChange: 1.8,
    isConnected: true,
  },
  {
    id: "3",
    name: "Investment Portfolio",
    type: "investment",
    institution: "Fidelity",
    balance: 67890.50,
    currency: "USD",
    lastUpdated: "2025-01-20T09:15:00",
    accountNumber: "****2201",
    monthlyChange: -1.2,
    isConnected: true,
  },
  {
    id: "4",
    name: "Travel Rewards Card",
    type: "credit",
    institution: "American Express",
    balance: 2340.00,
    currency: "USD",
    lastUpdated: "2025-01-20T08:00:00",
    accountNumber: "****1009",
    monthlyChange: 12.5,
    isConnected: true,
  },
  {
    id: "5",
    name: "Emergency Fund",
    type: "savings",
    institution: "Ally Bank",
    balance: 15000.00,
    currency: "USD",
    lastUpdated: "2025-01-20T10:30:00",
    accountNumber: "****6677",
    monthlyChange: 2.1,
    isConnected: true,
  },
  {
    id: "6",
    name: "Auto Loan",
    type: "loan",
    institution: "Capital One",
    balance: 8500.00,
    currency: "USD",
    lastUpdated: "2025-01-19T14:00:00",
    accountNumber: "****3344",
    monthlyChange: -4.2,
    isConnected: true,
  },
];

export default function Accounts() {
  const [accounts] = useState<Account[]>(mockAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(mockAccounts[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast.success("All accounts synced successfully!");
  };

  const handleLinkAccount = () => {
    toast.info("Account linking requires Cloud integration", {
      description: "Enable Lovable Cloud to connect real bank accounts via Open Banking.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Wallet className="h-7 w-7 text-primary" />
              Accounts
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all your linked financial accounts
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefreshAll}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Sync All
            </Button>
            <Button onClick={handleLinkAccount}>
              <Link2 className="h-4 w-4 mr-2" />
              Link Account
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <AccountsSummary accounts={accounts} />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Accounts List */}
          <div className="xl:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Your Accounts</h2>
              <span className="text-sm text-muted-foreground">{accounts.length} accounts</span>
            </div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
              <AnimatePresence>
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onSelect={setSelectedAccount}
                    isSelected={selectedAccount?.id === account.id}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Account Details */}
          <div className="xl:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {selectedAccount ? (
                <motion.div
                  key={selectedAccount.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <AccountBalanceChart account={selectedAccount} />
                  <AccountTransactions account={selectedAccount} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select an account
                  </h3>
                  <p className="text-muted-foreground">
                    Click on any account to view its balance history and transactions
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
