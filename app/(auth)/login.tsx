import React, { useState } from "react";
import { Keyboard, Pressable, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    console.log("Logging in...", email, password);
    // Dynamic routing to home board
    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      <Pressable onPress={Keyboard.dismiss} className="flex-1 justify-center px-6">
        {/* Background decorative blurs */}
        <View pointerEvents="none" className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-[80px]" />
        <View pointerEvents="none" className="absolute bottom-20 left-0 w-64 h-64 bg-slate-200/40 rounded-full blur-[60px]" />

        {/* Brand details */}
        <View className="mb-10">
          <Text className="font-extrabold text-4xl text-[#006d43] tracking-tight">
            Oga Ledger
          </Text>
          <Text className="text-sm text-[#6d7a70] font-semibold uppercase mt-1 tracking-wider">
            Sign in to your sovereign database
          </Text>
        </View>

        {/* Inputs */}
        <View className="gap-5 mb-8">
          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Email Address
            </Text>
            <Input variant="outline" size="xl" className="bg-white rounded-2xl border-[#bccabe]/30 px-3">
              <InputField
                placeholder="oga@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-[#1a1c1e] font-medium"
              />
            </Input>
          </View>

          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Password
            </Text>
            <Input variant="outline" size="xl" className="bg-white rounded-2xl border-[#bccabe]/30 px-3">
              <InputField
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="text-[#1a1c1e] font-medium"
              />
            </Input>
          </View>
        </View>

        {/* SignIn Button */}
        <Button
          onPress={handleLogin}
          className="w-full bg-[#006d43] active:bg-[#005232] h-14 rounded-2xl shadow-lg shadow-[#005232]/20 mb-6"
        >
          <ButtonText className="text-white text-lg font-bold">
            Sign In
          </ButtonText>
        </Button>

        {/* Redirect links */}
        <View className="items-center justify-center">
          <Text className="text-sm text-[#6d7a70] font-semibold">
            Don't have an account?{" "}
            <Link href="/signup" asChild>
              <Text className="text-[#006d43] font-bold active:opacity-75">
                Sign Up
              </Text>
            </Link>
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
