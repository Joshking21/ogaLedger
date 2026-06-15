import { Button, ButtonText } from "@/components/ui/button";
// import { useProfile } from "@/store/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  AlertCircle,
  Bell,
  Plus,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from "lucide-react-native";

import React, { useEffect } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import { useProfile } from "@/store/useStore";

const { width } = Dimensions.get("window");

const HomeTab = () => {
  const router = useRouter();
  const { transactions, debtors } = useApp();

  // const [name, setName] = useState<string | null>(null);
  // const [shopName, setShopName] = useState<string | null>(null);
  const [{ name, shopName }, { setName, setShopName }] = useProfile();

  // 2. Fetch the credentials asynchronously safely inside a hook
  useEffect(() => {
    const checkCredentials = async () => {
      try {
        setName((await AsyncStorage.getItem("userFullName")) || "");
        setShopName((await AsyncStorage.getItem("userShopName")) || "");
      } catch (error) {
        console.error("Failed to load credentials:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    checkCredentials();
  }, []);

  const words = name?.split(" ");

  // Grab the second item (index 1, since programming counts from 0)
  const secondWord = words?.[1];
  // Calculate stats based on transactions
  const todaySales = transactions
    .filter((t) => t.type === "sale")

    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebts = debtors.reduce((sum, d) => sum + d.amountOwed, 0);

  // Take first 3 transactions for recent activities
  const recentActivities = transactions.slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Background Decorative Blur Elements */}
      <View className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-[100px]" />
      <View className="absolute top-[60%] left-0 w-80 h-80 bg-slate-200/40 rounded-full blur-[80px]" />

      {/* Top Header Row */}
      <View className="flex-row justify-between items-center px-6 py-4 z-10">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full overflow-hidden bg-[#b9ebca] flex items-center justify-center border border-[#bccabe]/15">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfzf5KubdEPPO8BINF_eGvh6hoFvakSfpSLS34nO6I_gSG65hLFmEQAS6SyLi0J2pkGWvvCU7c1tsTutRTy2mXRY6b7Sn15mrK8x_FaVc-UZPU8Q8EX1mOeHrKWxqghAFguHy2sZ2IjeK8A20F3v_UmG1FhZZVj5SK30RZUGJrfq24UOOhOns8aikKgP2LxemSxDaVeWxp8A3xrbFUK7JMpRDI3Vuw92SmRVh4pBEFag6kGJT8jXrX9k9pMiakGIDQf1ndX7FU6CU",
              }}
              className="w-full h-full object-cover"
            />
          </View>
          <Text className="font-extrabold text-xl text-[#006d43] tracking-tight">
            {shopName} Ledger
          </Text>
        </View>

        <Pressable className="p-2 rounded-full bg-white hover:bg-slate-100 border border-[#bccabe]/15 active:scale-95">
          <Bell size={20} color="#6d7a70" />
        </Pressable>
      </View>

      <ScrollView 
  showsVerticalScrollIndicator={false} 
  style={{ flex: 1, paddingHorizontal: 24 }}
>
        {/* Overview Banner */}
        <View className="mb-6 mt-2">
          {/* <Text className="font-bold text-xs text-[#3d4a41] tracking-widest uppercase mb-1">
            OVERVIEW
          </Text> */}
          <Text className="font-extrabold text-3xl text-[#1a1c1e] tracking-tight">
            Morning, Oga {secondWord}
          </Text>
        </View>

        {/* Bento Grid: Summary Cards */}
        <View className="flex-row gap-4 mb-6">
          {/* Today's Sales - Hero summary card */}
          <View className="flex-1 bg-[#006d43] rounded-3xl p-5 justify-between min-h-[160px] relative overflow-hidden shadow-md">
            {/* Watermark Naira symbol rotated */}
            <View className="absolute -right-6 -top-8 opacity-10 select-none transform rotate-12">
              <Text className="text-[120px] font-black text-[#005232]">₦</Text>
            </View>

            <View className="z-10">
              <Text className="text-white/80 font-semibold text-xs uppercase tracking-wider">
                Today's Sales
              </Text>
              <Text className="text-white font-extrabold text-3xl mt-2 tracking-tight">
                ₦{todaySales.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between items-center z-10 mt-4">
              <View className="bg-white/15 px-2.5 py-0.5 rounded-full">
                <Text className="text-emerald-300 text-xs font-bold">+12%</Text>
              </View>
              <Button
                onPress={() => router.push("/explore")}
                className="bg-white/10 active:bg-white/20 px-3 py-1.5 rounded-xl border border-white/10"
              >
                <ButtonText className="text-white text-xs font-bold">
                  Details
                </ButtonText>
              </Button>
            </View>
          </View>

          {/* Total Debts Card */}
          <View className="flex-1 bg-[#e2e2e5] rounded-3xl p-5 justify-between min-h-[160px] shadow-sm">
            <View>
              <Text className="text-[#3d4a41] font-semibold text-xs uppercase tracking-wider">
                Total Debts
              </Text>
              <Text className="text-[#a5393e] font-extrabold text-3xl mt-2 tracking-tight">
                ₦{totalDebts.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between items-end mt-4">
              {/* Avatar stack */}
              <View className="flex-row -space-x-3">
                {debtors.slice(0, 3).map((debtor) => (
                  <View
                    key={debtor.id}
                    className="w-7 h-7 rounded-full border-2 border-[#e2e2e5] bg-slate-300 overflow-hidden"
                  >
                    <Image
                      source={{ uri: debtor.avatar }}
                      className="w-full h-full object-cover"
                    />
                  </View>
                ))}
                {debtors.length > 3 && (
                  <View className="w-7 h-7 rounded-full border-2 border-[#e2e2e5] bg-emerald-100 flex items-center justify-center">
                    <Text className="text-[9px] font-bold text-emerald-800">
                      +{debtors.length - 3}
                    </Text>
                  </View>
                )}
              </View>

              <Button
                onPress={() => router.push("/saved")}
                className="bg-transparent border-none p-0 active:opacity-85"
              >
                <ButtonText className="text-[#006d43] font-bold text-xs uppercase tracking-wider">
                  Remind All
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>

        {/* Recent Activities Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-extrabold text-xl text-[#1a1c1e] tracking-tight">
              Recent Activities
            </Text>
            <Button
              onPress={() => router.push("/explore")}
              className="bg-transparent border-none p-0 active:opacity-75"
            >
              <ButtonText className="text-[#006d43] font-bold text-sm">
                See all
              </ButtonText>
            </Button>
          </View>

          <View className="flex-col gap-4">
            {recentActivities.map((item) => {
              const isSale = item.type === "sale";
              const isDebt = item.type === "debt";
              const isExpense = item.type === "expense";

              // Map status background glow colors
              let glowBg = "bg-slate-100";
              let tintText = "text-[#1a1c1e]";
              let displayAmount = `₦${item.amount.toLocaleString()}`;

              if (isSale) {
                glowBg = "bg-[#006d43]/5"; // 5% green glow
                tintText = "text-[#006d43]";
                displayAmount = `+₦${item.amount.toLocaleString()}`;
              } else if (isDebt) {
                glowBg = "bg-[#a5393e]/5"; // 5% red glow
                tintText = "text-[#a5393e]";
                displayAmount = `-₦${item.amount.toLocaleString()}`;
              } else if (isExpense) {
                glowBg = "bg-[#d97706]/5"; // 5% amber glow
                tintText = "text-[#d97706]";
                displayAmount = `-₦${item.amount.toLocaleString()}`;
              }

              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    router.push({
                      pathname: "/detail",
                      params: { id: item.id },
                    })
                  }
                  className={`flex-row justify-between items-center p-5 rounded-3xl ${glowBg} border border-[#bccabe]/5`}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className={`w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-sm`}
                    >
                      {isSale ? (
                        <ShoppingCart size={22} color="#006d43" />
                      ) : isDebt ? (
                        <AlertCircle size={22} color="#a5393e" />
                      ) : (
                        <Wallet size={22} color="#6d7a70" />
                      )}
                    </View>
                    <View>
                      <Text className="font-bold text-[#1a1c1e] text-base leading-5">
                        {item.title}
                      </Text>
                      <Text className="text-[#6d7a70] text-xs mt-1">
                        {item.date} •{" "}
                        {item.type === "sale"
                          ? "Cash Sale"
                          : item.type === "debt"
                            ? "Credit"
                            : "Expense"}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className={`font-bold text-lg ${tintText}`}>
                      {displayAmount}
                    </Text>
                    <Text className="text-[10px] text-[#6d7a70] uppercase tracking-wider font-semibold mt-1">
                      {item.status}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Secondary Widgets Row */}
        <View className="flex-row gap-4 mb-20 shadow-md  ">
          {/* Weekly Growth Widget */}
          <View className="flex-1 bg-white p-5 rounded-3xl border border-[#bccabe]/10 shadow-sm flex-row gap-3 items-center">
            <View className="w-10 h-10 rounded-full bg-[#006d43]/10 items-center justify-center">
              <TrendingUp size={20} color="#006d43" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-sm text-[#1a1c1e]">
                Weekly Growth
              </Text>
              <Text
                className="text-xs text-[#6d7a70] mt-0.5"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Sales up by 18% this week.
              </Text>
            </View>
          </View>

          {/* Overdue Widget */}
          <View className="flex-1 bg-white p-5 rounded-3xl border border-[#bccabe]/10 shadow-sm flex-row gap-3 items-center">
            <View className="w-10 h-10 rounded-full bg-[#a5393e]/10 items-center justify-center">
              <AlertCircle size={20} color="#a5393e" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-sm text-[#1a1c1e]">
                3 Overdue
              </Text>
              <Text className="text-xs text-[#6d7a70] mt-0.5" numberOfLines={2}>
                Needs reminders today.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <Pressable
        onPress={() => router.push("/new-transaction")}
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: "#006d43",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          elevation: 10,
          shadowColor: "#005232",
          shadowOpacity: 0.25,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        }}
      >
        <Plus color="white" size={28} />
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeTab;
