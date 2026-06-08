import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart, Star, MapPin, Plus, Minus } from "@/components/icons";
import { useApp, mockMeals } from "../context/AppContext";

const { width } = Dimensions.get("window");

const MealDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, savedMeals, toggleSaveMeal } = useApp();

  const [quantity, setQuantity] = useState(1);

  const meal = mockMeals.find((m) => m.id === id) || mockMeals[0];
  const isSaved = savedMeals.includes(meal.id);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleOrderNow = () => {
    addToCart(meal, quantity);
    router.push("/cart");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Full-width Image Header Block */}
        <View className="relative w-full h-[320px]">
          <Image
            source={{ uri: meal.image }}
            className="w-full h-full object-cover"
          />
          {/* Glassmorphic/Floating Overlay Controls */}
          <SafeAreaView className="absolute top-0 left-0 right-0 px-4 flex-row justify-between items-center">
            <Pressable
              onPress={handleBack}
              className="bg-white/95 w-11 h-11 rounded-full items-center justify-center shadow-md shadow-black/10 border border-gray-100"
            >
              <ArrowLeft size={22} color="#1f2937" />
            </Pressable>
            <Pressable
              onPress={() => toggleSaveMeal(meal.id)}
              className="bg-white/95 w-11 h-11 rounded-full items-center justify-center shadow-md shadow-black/10 border border-gray-100"
            >
              <Heart
                size={22}
                color={isSaved ? "#ef4444" : "#1f2937"}
                fill={isSaved ? "#ef4444" : "none"}
              />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Content Body */}
        <View className="px-5 pt-6 pb-24">
          <Text className="text-2xl font-extrabold text-gray-900 mb-2 leading-8">
            {meal.title}
          </Text>

          {/* Price Block */}
          <Text className="text-[#F27318] text-2xl font-extrabold mb-4">
            ₦{meal.price.toLocaleString()}
          </Text>

          {/* Rating Row */}
          <View className="flex-row items-center mb-4 bg-gray-50 self-start px-3 py-1.5 rounded-xl border border-gray-100">
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text className="text-sm text-gray-700 ml-1.5 font-bold">
              {meal.rating}
            </Text>
            <Text className="text-xs text-gray-400 ml-1 font-medium">
              ({meal.reviews} reviews)
            </Text>
          </View>

          {/* Location Block */}
          <View className="flex-row items-start mb-6">
            <MapPin size={18} color="#F27318" className="mt-0.5" />
            <Text className="text-sm font-semibold text-gray-600 ml-2 flex-1 leading-5">
              {meal.location}
            </Text>
          </View>

          {/* About This Meal */}
          <Text className="text-base font-bold text-gray-900 mb-2">About this meal</Text>
          <Text className="text-sm text-gray-500 leading-6 font-medium">
            {meal.description}
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Order Bar */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8 flex-row items-center justify-between"
        style={{
          shadowColor: "#000000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -5 },
          elevation: 10,
        }}
      >
        {/* Quantity selector */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl p-1.5 px-3">
          <Pressable
            onPress={handleDecrease}
            className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
          >
            <Minus size={16} color="#4b5563" />
          </Pressable>
          <Text className="text-base font-extrabold text-gray-900 mx-5 w-6 text-center">
            {quantity.toString().padStart(2, "0")}
          </Text>
          <Pressable
            onPress={handleIncrease}
            className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
          >
            <Plus size={16} color="#4b5563" />
          </Pressable>
        </View>

        {/* Order button */}
        <Pressable
          onPress={handleOrderNow}
          className="flex-1 ml-4 bg-[#F27318] active:bg-[#C65A10] h-14 rounded-2xl items-center justify-center shadow-md shadow-orange-500/20"
        >
          <Text className="text-white text-base font-bold">Order Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MealDetail;
