import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Keyboard, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   const saveCredentials = async (email, password) => {
  //   try {
  //     // 1. Save the email to standard storage (unencrypted but persistent)
  //     await AsyncStorage.setItem('user_email', email);

  //     // 2. Save the password securely (encrypted via iOS Keychain / Android Keystore)
  //     await SecureStore.setItemAsync('user_password', password);

  //     console.log('Credentials saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };

  const handleSignUp = async () => {
    try {
      // 1. Save the email to standard storage (unencrypted but persistent)
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userShopName", shopName);
      await AsyncStorage.setItem("userFullName", fullName);

      // 2. Save the password securely (encrypted via iOS Keychain / Android Keystore)
      await SecureStore.setItemAsync("userPassword", password);

      console.log("Credentials saved successfully!");
      Alert.alert("Credentials Submitted", "Password submitted successfully", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Error saving data. Try again.");
    }
    if (!fullName || !shopName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match. Please verify and try again.",
      );
      return;
    }
    console.log("Signing up...", fullName, shopName, email, password);
    Alert.alert(
      "Account Created",
      `Welcome Oga ${fullName}! Your ledger shop "${shopName}" is registered successfully.`,
      [{ text: "Get Started", onPress: () => router.replace("/home") }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      <Pressable
        onPress={Keyboard.dismiss}
        className="flex-1 justify-center px-6"
      >
        {/* Background decorative blurs */}
        <View pointerEvents="none" className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-[80px]" />
        <View pointerEvents="none" className="absolute bottom-20 left-0 w-64 h-64 bg-slate-200/40 rounded-full blur-[60px]" />

        {/* Brand details */}
        <View className="mb-10">
          <Text className="font-extrabold text-4xl text-[#006d43] tracking-tight">
            Oga Ledger
          </Text>
          <Text className="text-sm text-[#6d7a70] font-semibold uppercase mt-1 tracking-wider">
            Register your Sovereign Business
          </Text>
        </View>

        {/* Inputs */}
        <View className="gap-5 mb-8">
          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Full Name
            </Text>
            <Input
              variant="outline"
              size="xl"
              className="bg-white rounded-2xl border-[#bccabe]/30 px-3"
            >
              <InputField
                placeholder="e.g. Chukwuma O."
                value={fullName}
                onChangeText={setFullName}
                className="text-[#1a1c1e] font-medium"
              />
            </Input>
          </View>

          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Shop Name
            </Text>
            <Input
              variant="outline"
              size="xl"
              className="bg-white rounded-2xl border-[#bccabe]/30 px-3"
            >
              <InputField
                placeholder="e.g. Oga's Provision Store"
                value={shopName}
                onChangeText={setShopName}
                className="text-[#1a1c1e] font-medium"
              />
            </Input>
          </View>

          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Email Address
            </Text>
            <Input
              variant="outline"
              size="xl"
              className="bg-white rounded-2xl border-[#bccabe]/30 px-3"
            >
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
            <Input
              variant="outline"
              size="xl"
              className="bg-white rounded-2xl border-[#bccabe]/30 px-3"
            >
              <InputField
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="text-[#1a1c1e] font-medium"
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)}>
                <InputIcon
                  as={showPassword ? Eye : EyeOff}
                  className="text-[#6d7a70]"
                />
              </InputSlot>
            </Input>
          </View>

          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Confirm Password
            </Text>
            <Input
              variant="outline"
              size="xl"
              className="bg-white rounded-2xl border-[#bccabe]/30 px-3"
            >
              <InputField
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                className="text-[#1a1c1e] font-medium"
              />
              <InputSlot
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <InputIcon
                  as={showConfirmPassword ? Eye : EyeOff}
                  className="text-[#6d7a70]"
                />
              </InputSlot>
            </Input>
          </View>
        </View>

        {/* SignUp Button */}
        <Button
          onPress={handleSignUp}
          className="w-full bg-[#006d43] active:bg-[#005232] h-14 rounded-2xl shadow-lg shadow-[#005232]/20 mb-6"
        >
          <ButtonText className="text-white text-lg font-bold">
            Create Account
          </ButtonText>
        </Button>

        {/* Redirect links */}
        <View className="items-center justify-center">
          <Text className="text-sm text-[#6d7a70] font-semibold">
            Already have an account?{" "}
            <Link href="/login" asChild>
              <Text className="text-[#006d43] font-bold active:opacity-75">
                Sign In
              </Text>
            </Link>
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignUp;
