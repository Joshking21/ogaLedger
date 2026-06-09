import MyCarousel from "@/components/carousel";
import { Users } from "@/components/icons";
import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react"; // Added hooks
import { Dimensions, Text, View, ActivityIndicator } from "react-native"; // Added ActivityIndicator
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => { // Removed 'async' from here
  const { width } = Dimensions.get("window");
  
  // 1. Setup states for checking authentication and handling loading delay
  const [savedAuth, setSavedAuth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch the credentials asynchronously safely inside a hook
  useEffect(() => {
    const checkCredentials = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const password = await SecureStore.getItemAsync("userPassword");
        
        // If both exist, set auth to true, otherwise false
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

  // 3. Show a loader while checking storage (stops screen flashing/flickering)
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#f9f9fc] justify-center items-center">
        <ActivityIndicator size="large" color="#006d43" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {savedAuth ? (
        <View
          style={{ width: width }}
          className="flex-1 justify-between items-center px-8 pt-12 pb-6 bg-[#f9f9fc]"
        >
          {/* Decorative Blur Backgrounds */}
          <View className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-[80px]" />
          <View className="absolute bottom-20 left-0 w-64 h-64 bg-slate-200/40 rounded-full blur-[60px]" />

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

            <Link href="/home" asChild>
              <Button className="w-full bg-[#006d43] active:bg-[#005232] h-14 rounded-2xl shadow-lg shadow-[#005232]/20">
                <ButtonText className="text-white text-lg font-bold">
                  Get Started
                </ButtonText>
              </Button>
            </Link>
          </View>
        </View>
      ) : (
        <MyCarousel />
      )}
    </SafeAreaView>
  );
};

export default Home;