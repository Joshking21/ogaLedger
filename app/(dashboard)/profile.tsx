import { useProfile } from "@/store/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Bell,
  Briefcase,
  Building,
  ChevronRight,
  Fingerprint,
  HelpCircle,
  Languages,
  Lock,
  LogOut,
  Receipt,
  ShieldAlert,
  Sun,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";

const ProfileTab = () => {
  const router = useRouter();
  const { businessProfile } = useApp();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [{ name, shopName, profileUrl }] = useProfile();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of Oga Ledger?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("userEmail");
            await SecureStore.deleteItemAsync("userPassword");
            console.log("Cache cleared!");
          } catch (error) {
            console.error("Error clearing data:", error);
          } finally {
            router.replace("/");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Top Title */}
      <View className="px-6 pt-4 pb-2">
        <Text className="font-extrabold text-3xl text-[#1a1c1e] tracking-tight">
          Settings
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Profile Header */}
        <View className="flex-row items-center gap-4 py-6">
          <View className="relative">
            <View className="w-20 h-20 rounded-full border-4 border-[#00a86b] p-1 bg-white shadow-sm overflow-hidden">
              {profileUrl ? (
                <Image
                  source={{ uri: profileUrl }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <User size={32} color="#666" />
                </View>
              )}
            </View>
            <Pressable
              onPress={() => router.push("/edit-profile")}
              className="absolute bottom-0 right-0 bg-[#006d43] p-1.5 rounded-full border-2 border-white active:scale-90"
            >
              <Text className="text-[9px] font-bold text-white uppercase px-0.5">
                Edit
              </Text>
            </Pressable>
          </View>

          <View className="flex-1">
            <Text className="text-2xl font-extrabold text-[#1a1c1e] tracking-tight">
              {name?.split(" ")[0] +
                " " +
                name?.split(" ")[1].slice(0, 1) +
                "."}
            </Text>
            <View className="flex-row items-center gap-1.5 mt-1">
              <Building size={14} color="#006d43" />
              <Text className="text-[#006d43] font-semibold text-sm">
                {shopName} Enterprise
              </Text>
            </View>
          </View>
        </View>

        {/* Section: Business Settings */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-[#6d7a70] mb-3 px-1">
            Business Settings
          </Text>
          <View className="bg-[#f3f3f6] rounded-3xl overflow-hidden">
            <Pressable
              onPress={() => router.push("/edit-profile")}
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Briefcase size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Business Profile
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Feature Locked",
                  "CAC validation pending for automated accounts.",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Building size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Bank Accounts
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Feature Locked",
                  "Tax registration requires physical submission.",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Receipt size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Tax Information
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>
          </View>
        </View>

        {/* Section: Security */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-[#6d7a70] mb-3 px-1">
            Security
          </Text>
          <View className="bg-[#f3f3f6] rounded-3xl overflow-hidden">
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Change PIN",
                  "Secure verification code has been sent to your registered number.",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Lock size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Change PIN
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <View className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10">
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Fingerprint size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Biometric Login
                </Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
                trackColor={{ false: "#e2e2e5", true: "#00a86b" }}
                thumbColor={biometricsEnabled ? "#006d43" : "#f4f3f4"}
              />
            </View>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Devices List",
                  "Authorized device: Tecno Phantom X2 (Active)",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <User size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Trusted Devices
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>
          </View>
        </View>

        {/* Section: Preferences */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-[#6d7a70] mb-3 px-1">
            Preferences
          </Text>
          <View className="bg-[#f3f3f6] rounded-3xl overflow-hidden">
            <View className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10">
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Languages size={20} color="#006d43" />
                </View>
                <View>
                  <Text className="font-bold text-[#1a1c1e] text-base">
                    Language
                  </Text>
                  <Text className="text-xs text-[#6d7a70]">English (US)</Text>
                </View>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </View>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Notifications",
                  "Push alert permissions are active.",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Bell size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Notifications Settings
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <View className="w-full flex-row items-center justify-between p-4 bg-transparent">
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <Sun size={20} color="#006d43" />
                </View>
                <View>
                  <Text className="font-bold text-[#1a1c1e] text-base">
                    Theme
                  </Text>
                  <Text className="text-xs text-[#006d43] font-bold">
                    Light Mode
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </View>
          </View>
        </View>

        {/* Section: Support & Legal */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-[#6d7a70] mb-3 px-1">
            Support & Legal
          </Text>
          <View className="bg-[#f3f3f6] rounded-3xl overflow-hidden">
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Help Center",
                  "WhatsApp customer helpline: +234 812 345 6789",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <HelpCircle size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Help Center
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Privacy Policy",
                  "Oga Ledger utilizes end-to-end device database encryption.",
                )
              }
              className="w-full flex-row items-center justify-between p-4 bg-transparent border-b border-[#bccabe]/10 active:bg-[#e8e8ea]"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#006d43]/10 flex items-center justify-center">
                  <ShieldAlert size={20} color="#006d43" />
                </View>
                <Text className="font-bold text-[#1a1c1e] text-base">
                  Privacy Policy
                </Text>
              </View>
              <ChevronRight size={18} color="#6d7a70" />
            </Pressable>

            <Pressable
              onPress={handleLogout}
              className="w-full flex-row items-center justify-between p-4 bg-transparent active:bg-[#a5393e]/5"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-[#a5393e]/10 flex items-center justify-center">
                  <LogOut size={20} color="#a5393e" />
                </View>
                <Text className="font-bold text-[#a5393e] text-base">
                  Log Out
                </Text>
              </View>
              <ChevronRight size={18} color="#a5393e" />
            </Pressable>
          </View>
        </View>

        {/* Version branding block */}
        <View className="text-center py-6 mb-16 items-center">
          <Text className="text-[#6d7a70] text-xs font-semibold">
            Oga Ledger v2.4.0
          </Text>
          <Text className="text-[#6d7a70]/40 text-[9px] mt-1 uppercase tracking-widest font-bold">
            Powered by JayBobo Tech
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;
