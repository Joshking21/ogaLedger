import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useApp, Transaction } from "../../context/AppContext";
import { Search, ShoppingCart, AlertCircle, Wallet } from "lucide-react-native";

const ExploreTab = () => {
  const router = useRouter();
  const { transactions } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "sale" | "debt" | "expense">("all");

  const filters = [
    { label: "All Flow", key: "all" },
    { label: "Sales", key: "sale" },
    { label: "Debts", key: "debt" },
    { label: "Expenses", key: "expense" },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    // 1. Filter by category key
    const matchesFilter = activeFilter === "all" || tx.type === activeFilter;

    // 2. Filter by search query
    const matchesSearch =
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.customerName && tx.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.description && tx.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isSale = item.type === "sale";
    const isDebt = item.type === "debt";

    let glowBg = "bg-slate-100";
    let tintText = "text-[#1a1c1e]";
    let displayAmount = `₦${item.amount.toLocaleString()}`;

    if (isSale) {
      glowBg = "bg-[#006d43]/5";
      tintText = "text-[#006d43]";
      displayAmount = `+₦${item.amount.toLocaleString()}`;
    } else if (isDebt) {
      glowBg = "bg-[#a5393e]/5";
      tintText = "text-[#a5393e]";
      displayAmount = `-₦${item.amount.toLocaleString()}`;
    } else {
      displayAmount = `₦${item.amount.toLocaleString()}`;
    }

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/detail",
            params: { id: item.id },
          })
        }
        className={`flex-row justify-between items-center p-5 rounded-3xl ${glowBg} border border-[#bccabe]/5 mb-4`}
      >
        <View className="flex-row items-center gap-4 flex-1">
          <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-sm">
            {isSale ? (
              <ShoppingCart size={22} color="#006d43" />
            ) : isDebt ? (
              <AlertCircle size={22} color="#a5393e" />
            ) : (
              <Wallet size={22} color="#6d7a70" />
            )}
          </View>
          <View className="flex-1">
            <Text className="font-bold text-[#1a1c1e] text-base leading-5" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-[#6d7a70] text-xs mt-1">
              {item.date} • {isSale ? "Cash Sale" : isDebt ? "Credit" : "Expense"}
            </Text>
          </View>
        </View>

        <View className="items-end ml-4">
          <Text className={`font-bold text-lg ${tintText}`}>
            {displayAmount}
          </Text>
          <Text className="text-[10px] text-[#6d7a70] uppercase tracking-wider font-semibold mt-1">
            {item.status}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Search and Header Section */}
      <View className="px-6 pt-4 pb-2">
        <Text className="font-extrabold text-3xl text-[#1a1c1e] tracking-tight mb-4">
          Ledger History
        </Text>

        {/* Search input field */}
        <View className="flex-row items-center bg-[#f3f3f6] rounded-2xl px-4 py-3 border border-[#bccabe]/10">
          <Search size={20} color="#6d7a70" />
          <TextInput
            placeholder="Search items, descriptions, customers..."
            placeholderTextColor="#6d7a70"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-sm text-[#1a1c1e] font-medium"
          />
        </View>
      </View>

      {/* Filter Segmented Controls */}
      <View className="my-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <Pressable
                key={filter.key}
                onPress={() => setActiveFilter(filter.key as any)}
                className={`px-5 py-2.5 rounded-full ${
                  isActive ? "bg-[#006d43]" : "bg-[#f3f3f6]"
                }`}
              >
                <Text
                  className={`text-sm font-bold ${
                    isActive ? "text-white" : "text-[#6d7a70]"
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 80 }}
        ListEmptyComponent={
          <View className="py-20 items-center justify-center">
            <Wallet size={48} color="#bccabe" />
            <Text className="text-[#6d7a70] font-semibold text-center mt-4">
              No transactions matching filters.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ExploreTab;
