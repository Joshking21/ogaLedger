import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, MapPin, Plus } from "@/components/icons";
import { useApp } from "../context/AppContext";

const { width } = Dimensions.get("window");

const OrderCheckout = () => {
  const router = useRouter();
  const { cart, address, clearCart } = useApp();
  
  const [paymentMethod, setPaymentMethod] = useState<"mastercard" | "visa" | "paypal">("mastercard");

  const handleBack = () => {
    router.back();
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const delivery = 700;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    // Clear cart and route to track order
    clearCart();
    router.push("/track-order");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBFBFB] px-4 pt-3">
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable
          onPress={handleBack}
          className="bg-white w-11 h-11 rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <ArrowLeft size={22} color="#1f2937" />
        </Pressable>
        <Text className="text-lg font-extrabold text-gray-900">Checkout</Text>
        <View className="w-11" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Delivery Address Card */}
        <Text className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Delivery Address
        </Text>
        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1 mr-4">
            <View className="bg-orange-50 w-11 h-11 rounded-full items-center justify-center">
              <MapPin size={22} color="#F27318" fill="#F27318" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-gray-900 mb-0.5" numberOfLines={1}>
                {address.split(",")[0] || "Default Address"}
              </Text>
              <Text className="text-xs text-gray-400 font-semibold" numberOfLines={1}>
                {address.substring(address.indexOf(",") + 1).trim() || "Lagos (NIG)"}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/profile")}
            className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
          >
            <ChevronRight size={16} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Payment Selection Card */}
        <Text className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Payment Method
        </Text>
        <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6">
          {/* MasterCard */}
          <Pressable
            onPress={() => setPaymentMethod("mastercard")}
            className="flex-row items-center justify-between py-3 border-b border-gray-50"
          >
            <View className="flex-row items-center flex-1">
              {/* Mock MC Logo */}
              <View className="w-14 h-9 bg-gray-100 rounded-xl justify-center items-center flex-row relative overflow-hidden px-1 mr-3 border border-gray-200">
                <View className="w-6 h-6 rounded-full bg-red-500 opacity-90 translate-x-2" />
                <View className="w-6 h-6 rounded-full bg-amber-500 opacity-90 -translate-x-2" />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Master Card</Text>
                <Text className="text-xs text-gray-400 font-semibold">********2647</Text>
              </View>
            </View>
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                paymentMethod === "mastercard"
                  ? "border-[#F27318] bg-[#F27318]"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "mastercard" && (
                <View className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </View>
          </Pressable>

          {/* Visa */}
          <Pressable
            onPress={() => setPaymentMethod("visa")}
            className="flex-row items-center justify-between py-3 border-b border-gray-50"
          >
            <View className="flex-row items-center flex-1">
              {/* Mock Visa Logo */}
              <View className="w-14 h-9 bg-gray-100 rounded-xl justify-center items-center mr-3 border border-gray-200">
                <Text className="text-[#1A1F71] font-black italic text-base">VISA</Text>
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Visa</Text>
                <Text className="text-xs text-gray-400 font-semibold">********2647</Text>
              </View>
            </View>
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                paymentMethod === "visa"
                  ? "border-[#F27318] bg-[#F27318]"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "visa" && (
                <View className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </View>
          </Pressable>

          {/* PayPal */}
          <Pressable
            onPress={() => setPaymentMethod("paypal")}
            className="flex-row items-center justify-between py-3 mb-4"
          >
            <View className="flex-row items-center flex-1">
              {/* Mock PayPal Logo */}
              <View className="w-14 h-9 bg-gray-100 rounded-xl justify-center items-center mr-3 border border-gray-200">
                <Text className="text-[#003087] font-black italic text-sm">PayPal</Text>
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Paypal</Text>
                <Text className="text-xs text-gray-400 font-semibold">s*****@gmail.com</Text>
              </View>
            </View>
            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                paymentMethod === "paypal"
                  ? "border-[#F27318] bg-[#F27318]"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "paypal" && (
                <View className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </View>
          </Pressable>

          {/* Add Payment Method Button */}
          <Pressable className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-200 h-12 rounded-2xl items-center justify-center flex-row gap-2">
            <Plus size={16} color="#4b5563" />
            <Text className="text-gray-700 text-sm font-bold">Add Payment Method</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Order Summary bottom pane */}
      <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl mb-4">
        <Text className="text-base font-extrabold text-gray-900 mb-4">
          Order Summary
        </Text>

        <View className="flex-row justify-between mb-3">
          <Text className="text-sm font-semibold text-gray-400">Subtotal</Text>
          <Text className="text-sm font-bold text-gray-800">
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-sm font-semibold text-gray-400">Delivery</Text>
          <Text className="text-sm font-bold text-gray-800">
            ₦{delivery.toLocaleString()}
          </Text>
        </View>

        {/* Dashed Line */}
        <View className="border-t border-dashed border-gray-200 w-full mb-4" />

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-extrabold text-gray-900">Total</Text>
          <Text className="text-lg font-extrabold text-[#F27318]">
            ₦{total.toLocaleString()}
          </Text>
        </View>

        <Pressable
          onPress={handlePlaceOrder}
          className="w-full bg-[#F27318] active:bg-[#C65A10] h-14 rounded-2xl items-center justify-center shadow-md shadow-orange-500/20"
        >
          <Text className="text-white text-base font-bold">Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OrderCheckout;
