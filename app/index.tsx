import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { width } = Dimensions.get("window");

  const [savedAuth, setSavedAuth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCredentials = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const password = await SecureStore.getItemAsync("userPassword");

        setSavedAuth(!!(email && password));
      } catch (error) {
        console.error("Failed to load credentials:", error);
        setSavedAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkCredentials();
  }, []);

  // 👑 FIXED: Redirect inside useEffect once navigation container is fully mounted and ready.
  // This prevents index.tsx from trying to redirect during background re-renders when switching tabs!
  useEffect(() => {
    if (!isLoading && savedAuth) {
      router.replace("/home");
    }
  }, [isLoading, savedAuth]);

  // Show loading state while checking storage or while redirect is in progress
  if (isLoading || savedAuth) {
    return (
      <SafeAreaView className="flex-1 bg-[#f9f9fc] justify-center items-center">
        <ActivityIndicator size="large" color="#006d43" />
      </SafeAreaView>
    );
  }

  // Otherwise, return onboarding landing layout if unauthenticated
  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      <View
        style={{ width: width }}
        className="flex-1 justify-between items-center px-8 pt-12 pb-6 bg-[#f9f9fc]"
      >
        {/* Decorative Blur Backgrounds */}
        <View pointerEvents="none" className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-[80px]" />
        <View pointerEvents="none" className="absolute bottom-20 left-0 w-64 h-64 bg-slate-200/40 rounded-full blur-[60px]" />

        {/* Illustration */}
        <View className="flex-1 justify-center items-center z-10">
          <View className="w-48 h-48 rounded-full bg-emerald-50 items-center justify-center border border-[#bccabe]/15">
            <Users size={80} color="#006d43" />
          </View>
        </View>

        {/* Narrative Section */}
        <View className="w-full mb-8 z-10">
          <Text
            className="text-4xl font-bold text-[#1a1c1e] text-left tracking-tight mb-4"
            style={{ fontFamily: "System" }}
          >
            Sovereign Ledger
          </Text>
          <Text
            className="text-base text-[#3d4a41] text-left leading-6 mb-10"
            style={{ fontFamily: "System" }}
          >
            "The place to handle your business... No stress"
          </Text>

          {/* Points to home dashboard path */}
          <Link href="/home" asChild>
            <Button className="w-full bg-[#006d43] active:bg-[#005232] h-14 rounded-2xl shadow-lg shadow-[#005232]/20">
              <ButtonText className="text-white text-lg font-bold">
                Get Started
              </ButtonText>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
