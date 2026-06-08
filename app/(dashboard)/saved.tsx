import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useApp, Debtor } from "../../context/AppContext";
import { Users, AlertTriangle, Send } from "lucide-react-native";

const SavedTab = () => {
  const { debtors, sendReminder } = useApp();
  const [remindedList, setRemindedList] = useState<string[]>([]);

  const totalOutstanding = debtors.reduce((sum, d) => sum + d.amountOwed, 0);

  const handleRemind = (debtor: Debtor) => {
    sendReminder(debtor.id);
    setRemindedList((prev) => [...prev, debtor.id]);
    Alert.alert(
      "Reminder Sent",
      `A polite WhatsApp/SMS reminder has been dispatched to ${debtor.name} at ${debtor.phone} for ₦${debtor.amountOwed.toLocaleString()}.`
    );
  };

  const handleRemindAll = () => {
    debtors.forEach((d) => sendReminder(d.id));
    Alert.alert(
      "Reminders Dispatched",
      `Polite notifications have been sent to all ${debtors.length} outstanding debtors.`
    );
  };

  const renderDebtorItem = ({ item }: { item: Debtor }) => {
    const hasBeenReminded = remindedList.includes(item.id);

    return (
      <View
        className="bg-white rounded-3xl p-5 border border-[#bccabe]/10 shadow-sm flex-row items-center justify-between mb-4"
      >
        {/* Profile and Details */}
        <View className="flex-row items-center gap-4 flex-1">
          <View className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-[#bccabe]/10">
            <Image
              source={{ uri: item.avatar }}
              className="w-full h-full object-cover"
            />
          </View>

          <View className="flex-1">
            <Text className="font-bold text-[#1a1c1e] text-lg">
              {item.name}
            </Text>
            <View className="flex-row items-center gap-1.5 mt-1">
              <AlertTriangle size={12} color="#a5393e" />
              <Text className="text-[#a5393e] text-xs font-semibold">
                {item.overdueDays} {item.overdueDays === 1 ? "day" : "days"} overdue
              </Text>
            </View>
          </View>
        </View>

        {/* Amount and Send Action */}
        <View className="items-end ml-4">
          <Text className="font-extrabold text-lg text-[#a5393e]">
            ₦{item.amountOwed.toLocaleString()}
          </Text>
          <Pressable
            onPress={() => handleRemind(item)}
            className={`mt-2.5 px-4 py-2 rounded-xl flex-row items-center gap-1.5 ${
              hasBeenReminded ? "bg-slate-100" : "bg-[#006d43]"
            } active:opacity-95`}
          >
            <Send size={11} color={hasBeenReminded ? "#6d7a70" : "#ffffff"} />
            <Text className={`text-xs font-bold ${hasBeenReminded ? "text-[#6d7a70]" : "text-white"}`}>
              {hasBeenReminded ? "Reminded" : "Remind"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Header Info */}
      <View className="px-6 pt-4 pb-2">
        <Text className="font-extrabold text-3xl text-[#1a1c1e] tracking-tight mb-4">
          Debtors Board
        </Text>

        {/* Total Outstanding Card */}
        <View className="bg-[#a5393e]/5 rounded-3xl p-5 border border-[#a5393e]/10 flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-[#a5393e] text-xs uppercase font-bold tracking-wider">
              Total Outstanding
            </Text>
            <Text className="text-[#a5393e] font-extrabold text-3xl mt-1.5 tracking-tight">
              ₦{totalOutstanding.toLocaleString()}
            </Text>
          </View>

          {debtors.length > 0 && (
            <Pressable
              onPress={handleRemindAll}
              className="bg-[#a5393e] active:bg-[#852229] px-4 py-3 rounded-2xl shadow-sm"
            >
              <Text className="text-white text-xs font-bold uppercase tracking-wider">
                Remind All
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Debtors List */}
      <FlatList
        data={debtors}
        renderItem={renderDebtorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}
        ListEmptyComponent={
          <View className="py-20 items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-emerald-50 items-center justify-center mb-4">
              <Users size={32} color="#006d43" />
            </View>
            <Text className="text-[#6d7a70] font-semibold text-center">
              Excellent! No outstanding debts found.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SavedTab;
