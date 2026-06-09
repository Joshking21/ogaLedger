import React from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Trash2, Send, Calendar, Clock, User, FileText, Bookmark } from "lucide-react-native";
import { useApp } from "../context/AppContext";

const TransactionDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { transactions, deleteTransaction, sendReminder } = useApp();

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-[#f9f9fc] justify-center items-center">
        <Text className="text-[#6d7a70] font-semibold">Transaction not found.</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-[#006d43] px-4 py-2 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isSale = transaction.type === "sale";
  const isDebt = transaction.type === "debt";

  let tintText = "text-[#1a1c1e]";
  let glowBg = "bg-slate-100";
  let displayAmount = `₦${transaction.amount.toLocaleString()}`;

  if (isSale) {
    tintText = "text-[#006d43]";
    glowBg = "bg-[#006d43]/5";
    displayAmount = `+₦${transaction.amount.toLocaleString()}`;
  } else if (isDebt) {
    tintText = "text-[#a5393e]";
    glowBg = "bg-[#a5393e]/5";
    displayAmount = `-₦${transaction.amount.toLocaleString()}`;
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to permanently delete this entry from your ledger book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction(transaction.id);
            Alert.alert("Success", "Transaction deleted successfully.", [
              { text: "OK", onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  const handleSendReminder = () => {
    sendReminder(transaction.id);
    Alert.alert(
      "Reminder Sent",
      `Polite payment reminder for ₦${transaction.amount.toLocaleString()} has been dispatched to client ${transaction.customerName || "debtor"}.`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* App Bar */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-[#bccabe]/10 bg-white/80 z-10">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="p-1 rounded-full active:bg-slate-100"
          >
            <ArrowLeft size={24} color="#006d43" />
          </Pressable>
          <Text className="font-extrabold text-xl text-[#1a1c1e]">
            Transaction Details
          </Text>
        </View>

        <Pressable
          onPress={handleDelete}
          className="p-2.5 rounded-xl bg-[#a5393e]/10 active:bg-[#a5393e]/20"
        >
          <Trash2 size={18} color="#a5393e" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
        className="flex-1"
      >
        {/* Hero Amount block */}
        <View className={`items-center justify-center p-8 rounded-3xl ${glowBg} border border-[#bccabe]/10 mb-8`}>
          <Text className="text-[#6d7a70] text-xs font-bold uppercase tracking-widest mb-1.5">
            Total Value
          </Text>
          <Text className={`font-extrabold text-4xl tracking-tight ${tintText}`}>
            {displayAmount}
          </Text>
        </View>

        {/* Transaction Metadata card */}
        <View className="bg-white rounded-3xl p-6 border border-[#bccabe]/10 shadow-sm gap-5 mb-8">
          {/* Title row */}
          <View className="flex-row items-start gap-4">
            <Bookmark size={20} color="#6d7a70" className="mt-0.5" />
            <View className="flex-1">
              <Text className="text-xs text-[#6d7a70] font-semibold">Title</Text>
              <Text className="text-base font-bold text-[#1a1c1e] mt-0.5">
                {transaction.title}
              </Text>
            </View>
          </View>

          {/* Type row */}
          <View className="flex-row items-start gap-4">
            <Clock size={20} color="#6d7a70" className="mt-0.5" />
            <View className="flex-1">
              <Text className="text-xs text-[#6d7a70] font-semibold">Category Type</Text>
              <Text className="text-base font-bold text-[#1a1c1e] mt-0.5">
                {transaction.type === "sale" ? "Cash Sale" : transaction.type === "debt" ? "Credit / Debt" : "Expense"}
              </Text>
            </View>
          </View>

          {/* Date row */}
          <View className="flex-row items-start gap-4">
            <Calendar size={20} color="#6d7a70" className="mt-0.5" />
            <View className="flex-1">
              <Text className="text-xs text-[#6d7a70] font-semibold">Record Date</Text>
              <Text className="text-base font-bold text-[#1a1c1e] mt-0.5">
                {transaction.date}
              </Text>
            </View>
          </View>

          {/* Customer name row */}
          {transaction.customerName && (
            <View className="flex-row items-start gap-4">
              <User size={20} color="#6d7a70" className="mt-0.5" />
              <View className="flex-1">
                <Text className="text-xs text-[#6d7a70] font-semibold">Customer / Payee</Text>
                <Text className="text-base font-bold text-[#1a1c1e] mt-0.5">
                  {transaction.customerName}
                </Text>
              </View>
            </View>
          )}

          {/* Description row */}
          {transaction.description && (
            <View className="flex-row items-start gap-4">
              <FileText size={20} color="#6d7a70" className="mt-0.5" />
              <View className="flex-1">
                <Text className="text-xs text-[#6d7a70] font-semibold">Description</Text>
                <Text className="text-base font-medium text-[#3d4a41] leading-5 mt-0.5">
                  {transaction.description}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Bar - Only show when it's a debt for reminder */}
      {isDebt && (
        <View className="absolute bottom-0 w-full p-6 bg-white/95 border-t border-[#bccabe]/10">
          <Button
            onPress={handleSendReminder}
            className="w-full h-14 rounded-2xl bg-[#006d43] active:bg-[#005232] flex-row items-center justify-center gap-2 shadow-md shadow-[#005232]/25"
          >
            <ButtonIcon as={Send} className="text-white" />
            <ButtonText className="text-white font-bold text-lg">
              Send Reminders
            </ButtonText>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionDetail;
