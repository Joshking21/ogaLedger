import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { X, Calendar, Camera, BookOpen, User, FileText, CheckCircle2 } from "lucide-react-native";

const NewTransaction = () => {
  const router = useRouter();
  const { addTransaction } = useApp();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"sale" | "debt">("sale");
  const [customerName, setCustomerName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today, Oct 24, 2025");

  const handleSave = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount greater than 0.");
      return;
    }

    addTransaction({
      title: type === "sale" ? (description || "Wholesale Supply") : (customerName || "Unnamed Debtor"),
      amount: numAmount,
      type,
      customerName: customerName || undefined,
      description: description || undefined,
    });

    Alert.alert(
      "Success",
      `Recorded transaction of ₦${numAmount.toLocaleString()} successfully.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Decorative background blur */}
      <View className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-[80px]" />

      {/* Top Header App Bar */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-[#bccabe]/10 bg-white/80 z-10">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="p-1 rounded-full active:bg-slate-100"
          >
            <X size={24} color="#6d7a70" />
          </Pressable>
          <Text className="font-extrabold text-xl text-[#006d43]">
            New Transaction
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-[#6d7a70] font-bold">Draft saved</Text>
          <View className="w-2.5 h-2.5 rounded-full bg-[#00a86b]" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
          className="flex-1"
        >
          {/* Amount Entry Area */}
          <View className="items-center py-6">
            <Text className="text-[#6d7a70] text-sm font-bold uppercase tracking-wider mb-2">
              Amount Received
            </Text>
            <View className="flex-row items-baseline justify-center gap-1.5 w-full">
              <Text className="font-extrabold text-4xl text-[#006d43]">₦</Text>
              <TextInput
                placeholder="0.00"
                placeholderTextColor="#bccabe"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                autoFocus
                className="font-extrabold text-5xl text-[#1a1c1e] text-center p-0 flex-1 min-w-[120px]"
              />
            </View>
          </View>

          {/* Segmented Control Selector: Cash Sale vs Debt */}
          <View className="bg-[#f3f3f6] p-1.5 rounded-3xl flex-row gap-1.5 mb-8">
            <Pressable
              onPress={() => setType("sale")}
              className={`flex-1 flex-row items-center justify-center gap-2 py-3.5 px-4 rounded-2xl ${
                type === "sale" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <BookOpen size={18} color={type === "sale" ? "#006d43" : "#6d7a70"} />
              <Text
                className={`text-sm font-bold ${
                  type === "sale" ? "text-[#006d43]" : "text-[#6d7a70]"
                }`}
              >
                Cash Sale
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setType("debt")}
              className={`flex-1 flex-row items-center justify-center gap-2 py-3.5 px-4 rounded-2xl ${
                type === "debt" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <User size={18} color={type === "debt" ? "#a5393e" : "#6d7a70"} />
              <Text
                className={`text-sm font-bold ${
                  type === "debt" ? "text-[#a5393e]" : "text-[#6d7a70]"
                }`}
              >
                Debt
              </Text>
            </Pressable>
          </View>

          {/* Details Forms fields */}
          <View className="gap-6 mb-8">
            {/* Customer Name */}
            <View>
              <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
                Who is this for?
              </Text>
              <View className="flex-row items-center bg-[#f3f3f6] rounded-2xl px-4 py-3.5 border border-[#bccabe]/10">
                <User size={20} color="#6d7a70" />
                <TextInput
                  placeholder="Customer Name (Optional)"
                  placeholderTextColor="#6d7a70"
                  value={customerName}
                  onChangeText={setCustomerName}
                  className="flex-1 ml-3 text-sm text-[#1a1c1e] font-medium"
                />
              </View>
            </View>

            {/* Description */}
            <View>
              <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
                What was it for?
              </Text>
              <View className="flex-row items-start bg-[#f3f3f6] rounded-2xl px-4 py-3.5 border border-[#bccabe]/10">
                <FileText size={20} color="#6d7a70" className="mt-1" />
                <TextInput
                  placeholder="Description of goods or services"
                  placeholderTextColor="#6d7a70"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  className="flex-1 ml-3 text-sm text-[#1a1c1e] font-medium text-left align-top min-h-[60px]"
                />
              </View>
            </View>

            {/* Date Picker row */}
            <View className="flex-row items-center justify-between py-2 px-1">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                  <Calendar size={20} color="#6d7a70" />
                </View>
                <View>
                  <Text className="text-xs text-[#6d7a70] font-semibold">
                    Transaction Date
                  </Text>
                  <Text className="text-sm font-bold text-[#1a1c1e]">
                    {selectedDate}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => Alert.alert("Date Selection", "Date picker dialog simulated.")}
                className="active:opacity-85"
              >
                <Text className="text-[#006d43] font-bold text-sm">Change</Text>
              </Pressable>
            </View>
          </View>

          {/* Photo attachment box */}
          <Pressable
            onPress={() => Alert.alert("Camera Integration", "Simulating system camera upload attachment.")}
            className="w-full flex-row items-center justify-center gap-3 py-6 border-2 border-dashed border-[#bccabe]/30 rounded-3xl bg-[#f3f3f6]/40 active:opacity-75"
          >
            <Camera size={20} color="#6d7a70" />
            <Text className="font-bold text-sm text-[#6d7a70]">
              Attach Receipt or Item Photo
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Floating Save button wrapper */}
      <View className="absolute bottom-0 w-full p-6 bg-white/95 border-t border-[#bccabe]/10">
        <Button
          onPress={handleSave}
          className="w-full h-14 rounded-2xl bg-gradient-to-tl from-[#006d43] to-[#00a86b] flex-row items-center justify-center gap-2 shadow-md"
        >
          <ButtonIcon as={CheckCircle2} className="text-white" />
          <ButtonText className="text-white font-bold text-lg">
            Save Transaction
          </ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NewTransaction;
