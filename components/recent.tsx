import { Text, View, FlatList } from "react-native";
import React from "react";
import StyledButton from "./button";
import { ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react-native";

// --- Types ---
type TransactionStatus = "sale" | "expense" | "credit";

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  time: string;
  date: string;
  status: TransactionStatus;
  iconName: string;
}

// --- Mock Data ---
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", title: "Bag of Cement", category: "Building Materials", amount: 12500, time: "09:15 AM", date: "2026-04-14", status: "sale", iconName: "Package" },
  { id: "2", title: "Generator Fuel", category: "Utilities", amount: 5000, time: "11:20 AM", date: "2026-04-14", status: "expense", iconName: "Fuel" },
  { id: "3", title: "Bulk SMS Service", category: "Marketing", amount: 15000, time: "02:45 PM", date: "2026-04-13", status: "credit", iconName: "Send" },
  { id: "4", title: "Consultation Fee", category: "Services", amount: 50000, time: "04:00 PM", date: "2026-04-13", status: "sale", iconName: "UserCheck" },
];

// --- Sub-component for each row ---
const TransactionItem = ({ item }: { item: Transaction }) => {
  const isCredit = item.status === "credit";
  const isExpense = item.status === "expense";

  return (
    <View className="flex-row items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
      <View className="flex-row items-center gap-3">
        <View className={`p-2 rounded-full ${isExpense ? 'bg-red-100' : isCredit ? 'bg-amber-100' : 'bg-green-100'}`}>
          {isExpense ? <ArrowUpRight size={18} color="#ef4444" /> : isCredit ? <CreditCard size={18} color="#d97706" /> : <ArrowDownLeft size={18} color="#22c55e" />}
        </View>
        <View>
          <Text className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</Text>
          <Text className="text-xs text-zinc-500">{item.category} • {item.time}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-bold ${isExpense ? 'text-red-600' : isCredit ? 'text-amber-600' : 'text-green-600'}`}>
          {isExpense ? "-" : "+"} ₦{item.amount.toLocaleString()}
        </Text>
        <Text className="text-[10px] text-zinc-400 uppercase font-bold">{item.status}</Text>
      </View>
    </View>
  );
};

// --- Main Component ---
export default function Recent() {
  return (
    <View className="px-4 mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Recent Activities</Text>
        <StyledButton title="See all" variant="link" textClassName="text-purple-600" />
      </View>

      {/* List - Using map for fixed small lists, or FlatList for performance */}
      <View className="bg-white dark:bg-zinc-900 rounded-xl p-2 border-zinc-100 dark:border-zinc-800">
        {MOCK_TRANSACTIONS.map((item) => (
          <TransactionItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}