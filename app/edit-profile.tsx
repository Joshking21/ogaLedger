import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Camera, ChevronRight, Trash2, ShieldAlert } from "lucide-react-native";

const EditProfile = () => {
  const router = useRouter();
  const { businessProfile, updateBusinessProfile } = useApp();

  const [name, setName] = useState(businessProfile.name);
  const [category, setCategory] = useState(businessProfile.category);
  const [phone, setPhone] = useState(businessProfile.phone);
  const [address, setAddress] = useState(businessProfile.address);
  const [avatar, setAvatar] = useState(businessProfile.avatar);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSave = () => {
    if (name.trim() === "") {
      Alert.alert("Required Field", "Business name cannot be empty.");
      return;
    }
    updateBusinessProfile({
      name,
      category,
      phone,
      address,
      avatar,
    });
    Alert.alert("Profile Updated", "Your business profile changes have been saved.", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  const handleAvatarChange = () => {
    Alert.alert("Update Logo", "Select new business identity cover photo.", [
      { text: "Choose from Gallery", onPress: () => {} },
      { text: "Take a Photo", onPress: () => {} },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const categories = [
    { label: "General Retail & Wholesale", value: "retail" },
    { label: "Logistics & Transport", value: "logistics" },
    { label: "Hospitality & Food", value: "hospitality" },
    { label: "Professional Services", value: "tech" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fc]">
      {/* Top Header App Bar */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-[#bccabe]/10 bg-white/80 z-10">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="p-1 rounded-full active:bg-slate-100"
          >
            <ArrowLeft size={24} color="#006d43" />
          </Pressable>
          <Text className="font-extrabold text-xl text-[#1a1c1e]">
            Edit Profile
          </Text>
        </View>

        <Button
          onPress={handleSave}
          className="px-4 py-2 rounded-xl bg-[#006d43]/10 active:bg-[#006d43]/20"
        >
          <ButtonText className="text-[#006d43] font-bold text-sm">Save</ButtonText>
        </Button>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 }}
        className="flex-1"
      >
        {/* Business Logo Section */}
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-32 h-32 rounded-full overflow-hidden bg-[#e8e8ea] border-4 border-[#006d43]/15 shadow-sm">
              <img
                src={avatar}
                className="w-full h-full object-cover"
                alt="Business Logo"
              />
            </View>
            <Pressable
              onPress={handleAvatarChange}
              className="absolute bottom-0 right-0 w-10 h-10 bg-[#006d43] text-white rounded-full items-center justify-center border-2 border-white active:scale-90"
            >
              <Camera size={18} color="#ffffff" />
            </Pressable>
          </View>
          <View className="mt-4 items-center">
            <Text className="font-bold text-lg text-[#1a1c1e]">{name}</Text>
            <Text className="text-[#6d7a70] text-xs font-semibold uppercase mt-0.5 tracking-wider">
              Update your business identity
            </Text>
          </View>
        </View>

        {/* Form Details Area */}
        <View className="gap-6 mb-10">
          {/* Business Name Input */}
          <View>
            <View
              className={`bg-[#e8e8ea] rounded-2xl px-4 pt-6 pb-2.5 border-b-2 ${
                focusedField === "name" ? "border-[#006d43]" : "border-transparent"
              }`}
            >
              <Text className="absolute left-4 top-2 text-[9px] uppercase tracking-wider font-extrabold text-[#6d7a70]">
                Business Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="font-extrabold text-base text-[#1a1c1e] p-0"
              />
            </View>
            <Text className="mt-1 text-[10px] text-[#6d7a70] font-semibold pl-1">
              Use the legal name registered with the CAC.
            </Text>
          </View>

          {/* Business Category Input */}
          <View>
            <Text className="text-xs font-bold text-[#6d7a70] uppercase tracking-widest pl-1 mb-2">
              Business Category
            </Text>
            <View className="bg-[#e8e8ea] rounded-2xl overflow-hidden">
              {categories.map((cat) => {
                const isSelected = category === cat.value;
                return (
                  <Pressable
                    key={cat.value}
                    onPress={() => setCategory(cat.value)}
                    className={`p-3.5 px-4 flex-row justify-between items-center ${
                      isSelected ? "bg-[#006d43]/10" : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        isSelected ? "text-[#006d43]" : "text-[#1a1c1e]"
                      }`}
                    >
                      {cat.label}
                    </Text>
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#006d43]" />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Phone Number Input */}
          <View>
            <View
              className={`bg-[#e8e8ea] rounded-2xl px-4 pt-6 pb-2.5 border-b-2 ${
                focusedField === "phone" ? "border-[#006d43]" : "border-transparent"
              }`}
            >
              <Text className="absolute left-4 top-2 text-[9px] uppercase tracking-wider font-extrabold text-[#6d7a70]">
                Phone Number
              </Text>
              <View className="flex-row items-center">
                <Text className="font-extrabold text-base text-[#6d7a70] mr-2">
                  +234
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="font-extrabold text-base text-[#1a1c1e] p-0 flex-1"
                />
              </View>
            </View>
          </View>

          {/* Business Address Input */}
          <View>
            <View
              className={`bg-[#e8e8ea] rounded-2xl px-4 pt-6 pb-2.5 border-b-2 ${
                focusedField === "address" ? "border-[#006d43]" : "border-transparent"
              }`}
            >
              <Text className="absolute left-4 top-2 text-[9px] uppercase tracking-wider font-extrabold text-[#6d7a70]">
                Business Address
              </Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                className="font-bold text-sm text-[#1a1c1e] p-0 text-left align-top min-h-[60px]"
              />
            </View>
          </View>
        </View>

        {/* Danger Zone: Account Control */}
        <View className="bg-[#f3f3f6] p-5 rounded-3xl mb-8">
          <Text className="font-extrabold text-base text-[#a5393e] mb-4">
            Account Control
          </Text>
          <View className="gap-3">
            <Pressable
              onPress={() => Alert.alert("Feature Locked", "CAC check required for updates.")}
              className="flex-row items-center justify-between p-4 bg-white rounded-2xl active:bg-slate-50 border border-[#bccabe]/10"
            >
              <Text className="font-bold text-[#1a1c1e] text-sm">Change Password</Text>
              <ChevronRight size={16} color="#6d7a70" />
            </Pressable>

            <Pressable
              onPress={() => {
                Alert.alert(
                  "Delete Data",
                  "Are you sure you want to delete all local ledger database files? This cannot be undone.",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => router.replace("/") },
                  ]
                );
              }}
              className="flex-row items-center justify-between p-4 bg-white rounded-2xl active:bg-red-50 border border-[#bccabe]/10"
            >
              <Text className="font-bold text-[#a5393e] text-sm">Delete Ledger Data</Text>
              <Trash2 size={16} color="#a5393e" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
